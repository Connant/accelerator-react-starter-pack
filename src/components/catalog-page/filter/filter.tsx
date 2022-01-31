import NumberOfStrings from './number-of-strings/number-of-strings';
import PriceRange from './price-range/price-range';
import ToolType from './tool-type/tool-type';

type Props = {
  page: number
}

export default function CatalogFilter({ page }: Props): JSX.Element {
  return (
    <form className='catalog-filter' >
      <h2 className='title title--bigger catalog-filter__title'>Фильтр</h2>
      <PriceRange page={page} />
      <ToolType page={page} />
      <NumberOfStrings page={page} />
    </form>
  );
}


