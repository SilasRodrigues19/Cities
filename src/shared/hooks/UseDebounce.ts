import { useCallback, useRef } from 'react';

export const useDebounce = (delay = 300, notDelayInFirstTime = true) => {
  const isFirstTime = useRef(notDelayInFirstTime);
  const debouncing = useRef<NodeJS.Timeout>();

  const debounce = useCallback(
    (stoFunc: () => void) => {
      if (isFirstTime.current) {
        isFirstTime.current = false;
        stoFunc();
        return;
      }
      debouncing.current && clearTimeout(debouncing.current);

      debouncing.current = setTimeout(() => stoFunc(), delay);
    },
    [delay]
  );

  return { debounce };
};
