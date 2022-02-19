/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GuitarsType } from '../../../const';
import { fetchCurrentGuitar } from '../../../store/actions-api';
import { clearCurrentGuitar } from '../../../store/redusers/data-reducer/data-reducer';
import { GuitarType } from '../../../types/types';
import CardRating from '../../card-rating/card-rating';

type Props = {
  guitar: GuitarType;
}

function useToggle (initialValue: boolean): [boolean, ()=>void] {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((pvevValue) => !pvevValue);

  return [value, toggle];
}

export default function CardInfo({guitar}: Props): JSX.Element {

  const [isCharTab, toggleIsCharTab] = useToggle(true);
  const [isDescTab, toggleIsDescTab] = useToggle(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  const type = GuitarsType.get(guitar.type)?.type;

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentGuitar(id));
    }
    return () => {
      dispatch(clearCurrentGuitar());
    };
  }, [dispatch, id]);

  const handleCharButtonClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    if (isCharTab) {
      return;
    }
    toggleIsCharTab();
    toggleIsDescTab();
  };

  const handleDescButtonClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    if (isDescTab) {
      return;
    }
    toggleIsDescTab();
    toggleIsCharTab();
  };

  return (
    <div className="product-container">
      <img className="product-container__img" src="/img/content/guitar-2.jpg" width="90" height="235" alt="" />
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{guitar.name}</h2>
        <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

          <CardRating rating={guitar.rating} />

          <span className="rate__count"></span><span className="rate__message"></span>
        </div>
        <div className="tabs">

          <a href="#characteristics" onClick={handleCharButtonClick}
            className={`button ${!isCharTab && 'button--black-border'} button--medium tabs__button`}
          >
            Характеристики
          </a>

          <a href="#description" onClick={handleDescButtonClick}
            className={`button ${!isDescTab && 'button--black-border'} button--medium tabs__button`}
          >
            Описание
          </a>

          <div className="tabs__content" id="characteristics">
            {isCharTab && (
              <table className='tabs__table'>
                <tbody>
                  <tr className='tabs__table-row'>
                    <td className='tabs__title'>Артикул:</td>
                    <td className='tabs__value'>{guitar.vendorCode}</td>
                  </tr>
                  <tr className='tabs__table-row'>
                    <td className='tabs__title'>Тип:</td>
                    <td className='tabs__value'>{type}</td>
                  </tr>
                  <tr className='tabs__table-row'>
                    <td className='tabs__title'>Количество струн:</td>
                    <td className='tabs__value'>{guitar.stringCount} струнная</td>
                  </tr>
                </tbody>
              </table>
            )}
            {isDescTab && (
              <p className='tabs__product-description '>{guitar.description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">Цена:</p>
        <p className="product-container__price-info product-container__price-info--value">{guitar.price}₽</p><a className="button button--red button--big product-container__button" href="/">Добавить в корзину</a>
      </div>
    </div>
  );
}


