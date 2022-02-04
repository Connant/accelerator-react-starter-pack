import { useCallback } from 'react';
import { FilterState, GuitarSpecifications } from '../const';

export default function useDisabled (filter: FilterState): (guitarTypes: string[]) => string[] {
  const {stringCounts} = filter;

  const setUnchecked = useCallback(
    (guitarTypes: string[]) => {
      if ((stringCounts.length === 0)||(guitarTypes.length === 0)) {
        return stringCounts;
      }
      const allCounts = guitarTypes
        .reduce((acc: string[], item: string) => {
          const counts = GuitarSpecifications.get(item) || [];
          return [...acc, ...counts];
        }, []);

      const actualCounts = stringCounts.filter((count) => allCounts.includes(count));

      return actualCounts;
    },
    [stringCounts]);

  return setUnchecked;
}
