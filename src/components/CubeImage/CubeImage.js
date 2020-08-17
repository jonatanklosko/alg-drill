import React, { useRef, useEffect } from 'react';
import { cubeSVG } from 'sr-visualizer';

function CubeImage({
  apply = null,
  size = 150,
  planView = false,
  mask = null,
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const svg = root.firstChild;
    if (svg) {
      root.removeChild(svg);
    }

    cubeSVG(rootRef.current, {
      height: size,
      width: size,
      viewportRotations: [
        [1, 34],
        [0, -34],
      ],
      view: planView ? 'plan' : undefined,
      mask: mask,
      algorithm: apply,
    });
  }, [apply, size, planView, mask]);

  return <div ref={rootRef} />;
}

export default CubeImage;
