/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { STAR_ICON, STAR_FULL_ICON } from '../../const';
import { getCurrentGuitar, getGuitarsShow } from '../../store/selectors';
import { ratingList } from '../../utils';
import IconRating from '../card-rating/icon-rating';
import Footer from '../footer/footer';
import Header from '../header/header';
import BreadCrumps from './bread-crumps/bread-crumps';
import CardInfo from './card-info/card-info';
import Review from './review/review';


export default function CardPage(): JSX.Element {
  const guitarsList = useSelector(getGuitarsShow);
  const currentGuitar = useSelector(getCurrentGuitar);

  const guitar = guitarsList.find((el) => el.id);

  const starsCount= Math.trunc(guitar?.rating || 0);

  const starsList = ratingList.slice(starsCount).map((ratingValue) =>
    <IconRating key={ratingValue} iconClass={STAR_ICON} />,
  );

  const fullStarsList = ratingList.slice(0, starsCount).map((ratingValue) =>
    <IconRating key={ratingValue} iconClass={STAR_FULL_ICON} />,
  );

  return (
    <React.Fragment>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>

          <BreadCrumps guitar={currentGuitar} />
          <CardInfo guitar={currentGuitar} />
          <Review />

        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
