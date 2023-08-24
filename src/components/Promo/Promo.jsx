import { Link } from 'react-router-dom';

import promoImage from '../../images/promo-image.png';
import './Promo.css';

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container container">
        <div className="promo__wrapper">
          <div className="promo__info">
            <h1 className="promo__title">
              Учебный проект студента факультета Веб&#8209;разработки.
            </h1>
            <p className="promo__subtitle">
              Листайте ниже, чтобы узнать больше про этот проект и его
              создателя.
            </p>
          </div>
          <img className="promo__image" src={promoImage} alt="Промо" />
        </div>
        <div className="promo__nav">
          <Link className="promo__link link button" to="#About">
            Узнать больше
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Promo;
