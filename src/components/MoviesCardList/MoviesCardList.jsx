import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCardList.css';
import AppContext from '../../contexts/AppContext';
import MoviesCard from '../MoviesCard/MoviesCard';
import Loader from '../Loader/Loader';
import { useMediaQuery } from '../../hooks/useMediaQuerry';

const LG_ROW_CARD_COUNT = 4;
const MD_ROW_CARD_COUNT = 3;
const SM_ROW_CARD_COUNT = 2;

const LG_INITIAL_CARD_COUNT = 12;
const MD_INITIAL_CARD_COUNT = 9;
const SM_INITIAL_CARD_COUNT = 6;

const MoviesCardList = ({ searchText, cards }) => {
  const { isLoading, rowMovieList, filteredMovieList } = useContext(AppContext);
  const location = useLocation();

  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const isTablet = useMediaQuery('(min-width: 768px)');

  const cardColumnCount = isDesktop
    ? LG_ROW_CARD_COUNT
    : isTablet
    ? MD_ROW_CARD_COUNT
    : SM_ROW_CARD_COUNT;

  const initialCardCount = isDesktop
    ? LG_INITIAL_CARD_COUNT
    : isTablet
    ? MD_INITIAL_CARD_COUNT
    : SM_INITIAL_CARD_COUNT;

  const [visibleCardCount, setVisibleCardCount] = useState(initialCardCount);

  const roundedVisibleCardCount =
    Math.floor(visibleCardCount / cardColumnCount) * cardColumnCount;

  const handleClick = () => {
    calculateCardCount();
  };

  const calculateCardCount = () => {
    if (isDesktop) {
      return setVisibleCardCount(visibleCardCount + LG_ROW_CARD_COUNT);
    }

    if (isTablet) {
      return setVisibleCardCount(visibleCardCount + MD_ROW_CARD_COUNT);
    }

    setVisibleCardCount(visibleCardCount + SM_ROW_CARD_COUNT);
  };

  return (
    <div className="movie-card-list">
      <div className="movie-card-list__container container">
        {isLoading && <Loader />}
        {rowMovieList.length === 0 ? (
          <p className="movie-card-list__message">Найдите свой фильм</p>
        ) : filteredMovieList.length === 0 && searchText.trim().length ? (
          <p className="movie-card-list__message">
            По данному запросу ничего не найдено
          </p>
        ) : (
          <ul className="movie-card-list__cards">
            {cards?.slice(0, roundedVisibleCardCount).map((card) => (
              <MoviesCard card={card} key={card.id} />
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
          <button
            className={
              (location.pathname === '/movies' && 'movie-card-list__button') ||
              (location.pathname === '/saved-movies' &&
                'movie-card-list__button_saved-page')
            }
          >
            Ещё
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviesCardList;
