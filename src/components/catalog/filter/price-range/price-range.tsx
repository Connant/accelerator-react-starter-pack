import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterState } from '../../../../const';
import { fetchFilteredGuitars } from '../../../../store/actions-api';
import { getMinPrice, getMaxPrice } from '../../../../store/selectors';

type Props = {
  page: number,
  filter: FilterState,
}

export default function PriceRange({page, filter}: Props): JSX.Element {
  const priceMin = useSelector(getMinPrice);
  const priceMax = useSelector(getMaxPrice);

  const [minValue, setMinValue] = useState(filter.minPrice);
  const [maxValue, setMaxValue] = useState(filter.maxPrice);
  const dispatch = useDispatch();

  const handleMin = (event: ChangeEvent<HTMLInputElement>) => {
    let evt = event.target.value;
    let currentFilter = filter;
    if (evt === '' && evt !== null) {
      setMinValue(evt);
      return;
    }
    if ( + evt <= priceMin) {
      evt = priceMin.toString();
    }
    if ( + evt >= priceMax) {
      evt = priceMax.toString();
    }
    if ( + evt >= + maxValue && maxValue !== '') {
      evt = maxValue;
    }
    setMinValue(evt);
    currentFilter = {...currentFilter, minPrice: evt};
    dispatch(fetchFilteredGuitars(currentFilter, page));
  };


  const handleMax = (event: ChangeEvent<HTMLInputElement>) => {
    let currentFilter = filter;
    if (event.target.value === '' && event.target.value !== null) {
      setMaxValue(event.target.value);
      return;
    }
    if ( + event.target.value >= priceMax) {
      event.target.value = priceMax.toString();
    }
    if ( + event.target.value <= priceMin) {
      event.target.value = priceMin.toString();
    }
    if ( + event.target.value <= + minValue && minValue !== '') {
      event.target.value = minValue;
    }
    setMaxValue(event.target.value);
    currentFilter = {...currentFilter, maxPrice: event.target.value};
    dispatch(fetchFilteredGuitars(currentFilter, page));
  };

  useEffect(() => {
    setMinValue(filter.minPrice);
    setMaxValue(filter.maxPrice);
  }, [filter.minPrice, filter.maxPrice]);

  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Цена, ₽</legend>
      <div className='catalog-filter__price-range'>
        <div className='form-input'>
          <label className='visually-hidden'>Минимальная цена</label>
          <input type='number' placeholder='1700' onBlur={handleMin} value={minValue}
            onChange={(event) => setMinValue(event.target.value)} id='minPrice' name='от'
            data-testid='priceMin'
          />
        </div>
        <div className='form-input'>
          <label className='visually-hidden'>Максимальная цена</label>
          <input type='number' placeholder='35000' id='maxPrice' name='до'
            value={maxValue} onBlur={handleMax} onChange={(event) => setMaxValue(event.target.value)}
            data-testid='priceMax'
          />
        </div>
      </div>
    </fieldset>
  );
}


