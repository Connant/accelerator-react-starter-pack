import { useCallback, useRef } from 'react';
import { CallbackType } from '../components/search-box/search-box';
import { ThunkActionResult } from '../types/actions';

export const useDebounced = (callback: CallbackType, delay: number) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const recall = useCallback((action:ThunkActionResult<Promise<void>>) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      callback(action);
    }, delay);
  }, [callback, delay]);
  return recall;
};


