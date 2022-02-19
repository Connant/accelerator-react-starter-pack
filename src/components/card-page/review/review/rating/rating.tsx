import React from 'react';


type Props = {
  rating: number;
};


export default function Rating({ rating }: Props): JSX.Element {

  const STAR_NUMBERS = [1, 2, 3, 4, 5];

  return (
    <React.Fragment>
      <span className='visually-hidden'>Рейтинг:</span>
      {STAR_NUMBERS.map((number) => {
        const isFullStar = number <= rating;
        return (
          <svg key={number} width="11" height="12" aria-hidden='true'>
            <use xlinkHref={isFullStar ? '#icon-full-star' : '#icon-star'}>
            </use>
          </svg>
        );
      })}
    </React.Fragment>
  );
}

