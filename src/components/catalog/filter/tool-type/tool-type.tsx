import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { FilterState, GuitarsType, GuitarType } from '../../../../const';
import { fetchFilteredGuitars } from '../../../../store/actions-api';


type Props = {
  page: number,
  filter: FilterState,
}

export default function ToolType({page, filter}: Props): JSX.Element {
  const dispatch = useDispatch();

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentTypes = filter.guitarTypes.includes(event.target.value) ? filter.guitarTypes.filter((value) => value !== event.target.value) : [...filter.guitarTypes, event.target.value];
    const currentFilter = { ...filter, guitarTypes: currentTypes} as FilterState;
    dispatch(fetchFilteredGuitars(currentFilter, page));
  };

  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Тип гитар</legend>
      {[...GuitarsType.keys()].map((key) => {
        const { id, title } = GuitarsType.get(key) as GuitarType;

        return (
          <div key={id} className='form-checkbox catalog-filter__block-item'>
            <input className='visually-hidden' value={id} id={id} checked={filter.guitarTypes.includes(id)}
              type='checkbox' name={id} onChange={handleTypeChange}
            />
            <label htmlFor={id}>{title}</label>
          </div>
        );
      })}
    </fieldset>
  );
}


// https://habr.com/ru/company/plarium/blog/442116/
// https://remix.run/blog/react-router-v6
// https://blog.logrocket.com/migrating-react-router-v6-complete-guide/
// https://reactrouter.com/docs/en/v6/api#usesearchparams
// https://stackoverflow.com/questions/35352638/how-to-get-parameter-value-from-query-string
