import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredGuitars } from '../../../../store/actions-api';
import { getGuitarFilter, getMinPrice, getMaxPrice } from '../../../../store/selectors';

type Props = {
  page: number
}

export default function PriceRange({ page }: Props): JSX.Element {
  const filter = useSelector(getGuitarFilter);
  const priceMin = useSelector(getMinPrice);
  const priceMax = useSelector(getMaxPrice);

  const [minValue, setMinValue] = useState(filter.minPrice);
  const [maxValue, setMaxValue] = useState(filter.maxPrice);
  const dispatch = useDispatch();

  const priceMinString = priceMin.toString();
  const priceMaxString = priceMax.toString();


  useEffect(() => {
    setMinValue(filter.minPrice);
    setMaxValue(filter.maxPrice);
  }, [filter.minPrice, filter.maxPrice]);

  const handleMin = (event: ChangeEvent<HTMLInputElement>) => {
    let evt = event.target.value;
    let currentFilter = filter;
    if (evt === '' && evt !== null) {
      setMinValue(evt);
      return;
    }
    if ( + evt <= priceMin) {
      evt = priceMinString;
    }
    if ( + evt >= priceMax) {
      evt = priceMaxString;
    }
    if ( + evt >= + maxValue && maxValue !== '') {
      evt = maxValue;
    }
    setMinValue(evt);
    currentFilter = {...currentFilter, minPrice: evt};
    dispatch(fetchFilteredGuitars(currentFilter, page));
  };


  const handleMax = (event: ChangeEvent<HTMLInputElement>) => {
    let evt = event.target.value;
    let currentFilter = filter;
    if (evt === '' && evt !== null) {
      setMaxValue(evt);
      return;
    }
    if ( + evt >= priceMax) {
      evt = priceMaxString;
    }
    if ( + evt <= priceMin) {
      evt = priceMinString;
    }
    if ( + evt <= + minValue && minValue !== '') {
      evt = minValue;
    }
    setMaxValue(evt);
    currentFilter = {...currentFilter, maxPrice: evt};
    dispatch(fetchFilteredGuitars(currentFilter, page));
  };

  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Цена, ₽</legend>
      <div className='catalog-filter__price-range'>
        <div className='form-input'>
          <label className='visually-hidden'>Минимальная цена</label>
          <input type='number' placeholder='1700' onBlur={handleMin} value={minValue}
            onChange={(event) => setMinValue(event.target.value)} id='minPrice' name='от'
          />
        </div>
        <div className='form-input'>
          <label className='visually-hidden'>Максимальная цена</label>
          <input type='number' placeholder='35000' id='maxPrice' name='до'
            value={maxValue} onBlur={handleMax} onChange={(event) => setMaxValue(event.target.value)}
          />
        </div>
      </div>
    </fieldset>
  );
}


