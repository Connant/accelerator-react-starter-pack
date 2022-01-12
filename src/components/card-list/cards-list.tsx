import React from 'react';
import { useSelector } from 'react-redux';
import { getGuitarsList } from '../../store/selectors';
import Card from '../card/card';
import Pagination from '../pagination/pagination';


export default function CardsList():JSX.Element {
  const guitarsList = useSelector(getGuitarsList);

  return (
    <React.Fragment>

      <div className="cards catalog__cards">
        {guitarsList.slice(0, 9).map((guitar) => (
          <Card key={guitar.id} guitar={guitar} />
        ))};
      </div>

      <Pagination />

    </React.Fragment>
  );
}
