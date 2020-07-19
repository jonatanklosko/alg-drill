import { useState, useEffect, useCallback } from 'react';

export function useAsync(asyncFunction, args = []) {
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setPending(true);
    setValue(null);
    setError(null);
    return asyncFunction(...args)
      .then((response) => setValue(response))
      .catch((error) => setError(error))
      .finally(() => setPending(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asyncFunction, ...args]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { pending, value, error, refresh: execute };
}
