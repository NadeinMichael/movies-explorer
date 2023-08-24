import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';
import cardImg from '../../images/card-img.png';

const MoviesCard = () => {
  const [isSaved, setIsSaved] = useState(true);
  const location = useLocation();
  return (
    <li className="movie-card">
      <div className="movie-card__info">
        <h2 className="movie-card__title">В погоне за Бенкси</h2>
        <p className="movie-card__duration">27 минут</p>
      </div>
      <img className="movie-card__img" src={cardImg} alt="изображение фильма" />
      {isSaved ? (
        (location.pathname === '/movies' && (
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="movie-card__button movie-card__button_saved button"
          >
            ✔
          </button>
        )) ||
        (location.pathname === '/saved-movies' && (
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="movie-card__button movie-card__button_delete button"
          >
            ✖
          </button>
        ))
      ) : (
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="movie-card__button button"
        >
          Сохранить
        </button>
      )}
    </li>
  );
};

export default MoviesCard;
