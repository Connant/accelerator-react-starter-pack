import { FilterState } from '../../../const';
import NumberOfStrings from './number-of-strings/number-of-strings';
import PriceRange from './price-range/price-range';
import ToolType from './tool-type/tool-type';

type Props = {
  page: number
  filter: FilterState,
}

export default function CatalogFilter({page, filter}: Props): JSX.Element {
  return (
    <form className='catalog-filter' >
      <h2 className='title title--bigger catalog-filter__title'>Фильтр</h2>
      <PriceRange page={page} filter={filter} />
      <ToolType page={page} filter={filter} />
      <NumberOfStrings page={page} filter={filter} />
    </form>
  );
}


