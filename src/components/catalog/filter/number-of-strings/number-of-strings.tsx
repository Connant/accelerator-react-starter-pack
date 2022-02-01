import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { FilterState, StringCount } from '../../../../const';
import { fetchFilteredGuitars } from '../../../../store/actions-api';
import { StringType } from '../../../../types/types';

type Props = {
  page: number
  filter: FilterState,
}

export default function NumberOfStrings({page, filter}: Props): JSX.Element {
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const counts = filter.stringCounts.includes(event.target.value) ? filter.stringCounts.filter((value) => value !== event.target.value) : [...filter.stringCounts, event.target.value];
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
              checked={filter.stringCounts.includes(stringCount)}
              value={stringCount}
            />
            <label htmlFor={id}>{stringCount}</label>
          </div>
        );
      })}
    </fieldset>
  );
}

