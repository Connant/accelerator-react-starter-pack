import { ChangeEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuitarSpecifications, StringCount } from '../../../../const';
import { fetchFilteredGuitars } from '../../../../store/actions-api';
import { getGuitarFilter } from '../../../../store/selectors';
import { StringType } from '../../../../types/types';

type Props = {
  page: number
}

export default function NumberOfStrings({ page }: Props): JSX.Element {
  const filter = useSelector(getGuitarFilter);
  const dispatch = useDispatch();
  const { guitarTypes } = filter;
  const { stringCounts } = filter;

  const checkDisable = useCallback(
    (stringCount: string) => {
      if (guitarTypes.length === 0) {
        return false;
      }
      const disable = !guitarTypes.reduce((i: string[], a: string) => {
        const el = GuitarSpecifications.get(a) || [];
        return [...i, ...el];
      }, [])
        .includes(stringCount);
      return disable;
    },[guitarTypes]);

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
              checked={stringCounts.includes(stringCount)&&!checkDisable(stringCount)}
              value={stringCount}
            />
            <label htmlFor={id}>{stringCount}</label>
          </div>
        );
      })}
    </fieldset>
  );
}

