import { useEffect, useRef } from 'react';

// See https://usehooks.com/useEventListener
export function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores a handler.
  const handlerRef = useRef();

  // Update handlerRef current value when handler changes.
  // This allows our effect below to always get latest handler
  // without us needing to pass it in effect deps array
  // and potentially cause the effect to re-run on every render.
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure the element supports addEventListener.
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create an event listener that calls the handler function stored in ref.
      function eventListener(event) {
        handlerRef.current(event);
      }

      element.addEventListener(eventName, eventListener);

      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run when eventName or element changes.
  );
}
