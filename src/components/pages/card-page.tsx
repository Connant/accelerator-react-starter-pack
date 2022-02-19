/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { STAR_ICON, STAR_FULL_ICON } from '../../const';
import { getCurrentGuitar, getGuitarsShow } from '../../store/selectors';
import { ratingList } from '../../utils';
import IconRating from '../card-rating/icon-rating';
import Footer from '../footer/footer';
import Header from '../header/header';
import BreadCrumps from '../card-page/bread-crumps/bread-crumps';
import CardInfo from '../card-page/card-info/card-info';
import ReviewSection from '../card-page/review/review-section';


export default function CardPage(): JSX.Element {
  const guitarsList = useSelector(getGuitarsShow);
  const currentGuitar = useSelector(getCurrentGuitar);

  const guitar = guitarsList.find((el) => el.id);

  const starsCount= Math.trunc(guitar?.rating || 0);

  return (
    <React.Fragment>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>

          <BreadCrumps guitar={currentGuitar} />
          <CardInfo guitar={currentGuitar} />
          <ReviewSection />

        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
