import { useLocation } from 'react-router-dom';

import './MoviesCardList.css';

const MoviesCardList = ({ children }) => {
  const location = useLocation();

  return (
    <div className="movie-card-list">
      <div className="movie-card-list__container container">
        <ul className="movie-card-list__cards">{children}</ul>
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
