import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCardList.css';
import AppContext from '../../contexts/AppContext';
import MoviesCard from '../MoviesCard/MoviesCard';
import Loader from '../Loader/Loader';
import { useMediaQuery } from '../../hooks/useMediaQuerry';
import {
  LG_INITIAL_CARD_COUNT,
  MD_INITIAL_CARD_COUNT,
  SM_INITIAL_CARD_COUNT,
} from '../../constants';

const MoviesCardList = ({ searchText, cards }) => {
  console.log(cards);
  const { isLoading, rowMovieList } = useContext(AppContext);
  const location = useLocation();

  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const isTablet = useMediaQuery('(min-width: 768px)');

  const initialCardCount = isDesktop
    ? LG_INITIAL_CARD_COUNT
    : isTablet
    ? MD_INITIAL_CARD_COUNT
    : SM_INITIAL_CARD_COUNT;

  const [visibleCardCount, setVisibleCardCount] = useState(initialCardCount);

  const handleClick = () => {
    calculateCardCount();
  };

  const calculateCardCount = () => {
    if (isDesktop) {
      return setVisibleCardCount(visibleCardCount + 3);
    }

    if (isTablet) {
      return setVisibleCardCount(visibleCardCount + 2);
    }

    setVisibleCardCount(visibleCardCount + 2);
  };

  return (
    <div className='movie-card-list'>
      <div className='movie-card-list__container container'>
        {isLoading && <Loader />}
        {location.pathname === '/movies' && rowMovieList.length === 0 ? (
          <p className='movie-card-list__message'>Найдите свой фильм</p>
        ) : (cards.length === 0 && searchText?.trim().length) ||
          (location.pathname === '/saved-movies' &&
            cards.length === 0 &&
            searchText?.trim().length) ? (
          <p className='movie-card-list__message'>
            По данному запросу ничего не найдено
          </p>
        ) : (
          <ul className='movie-card-list__cards'>
            {cards?.slice(0, visibleCardCount).map((card) => (
              <MoviesCard card={card} key={card.id || card._id} />
            ))}
          </ul>
        )}
        <div
          className={
            (location.pathname === '/movies' &&
              'movie-card-list__button-container') ||
            (location.pathname === '/saved-movies' &&
              'movie-card-list__button-container movie-card-list__button-container_saved-page')
          }
        >
          {cards.length > visibleCardCount ? (
            <button
              className='movie-card-list__button button'
              onClick={handleClick}
            >
              Ещё
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MoviesCardList;
