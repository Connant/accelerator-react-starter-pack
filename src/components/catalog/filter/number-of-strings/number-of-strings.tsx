import { ChangeEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FilterState, GuitarSpecifications, StringCount } from '../../../../const';
import { fetchFilteredGuitars } from '../../../../store/actions-api';
import { StringType } from '../../../../types/types';

type Props = {
  page: number
  filter: FilterState,
}

export default function NumberOfStrings({page, filter}: Props): JSX.Element {
  const dispatch = useDispatch();
  const { guitarTypes, stringCounts } = filter;

  const checkIsDisable = useCallback(
    (stringCount: string) => {
      if (guitarTypes.length === 0) {
        return false;
      }
      const isDisable = !guitarTypes
        .reduce((acc: string[], item: string) => {
          const counts = GuitarSpecifications.get(item) || [];
          return [...acc, ...counts];
        }, [])
        .includes(stringCount);

      return isDisable;
    }, [guitarTypes]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const counts = stringCounts.includes(event.target.value) ? stringCounts.filter((value) => value !== event.target.value) : [...stringCounts, event.target.value];
    const currentFilter = { ...filter, stringCounts: counts };
    dispatch(fetchFilteredGuitars(currentFilter, page));
  };

  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Количество струн</legend>

      {[...StringCount.keys()].map((key) => {
        const { id, stringCount } = StringCount.get(key) as StringType;

        return (
          <div key={id} className='form-checkbox catalog-filter__block-item'>
            <input className='visually-hidden' type='checkbox' id={id} name={id}
              onChange={handleChange}
              checked={stringCounts.includes(stringCount)&&!checkIsDisable(stringCount)}
              value={stringCount}
              disabled={checkIsDisable(stringCount)}
            />
            <label htmlFor={id}>{stringCount}</label>
          </div>
        );
      })}
    </fieldset>
  );
}

