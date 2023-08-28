import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

import './MoviesCard.css';
import { commonImageUrl } from '../../constants';
const MoviesCard = ({ card }) => {
  const [isSaved, setIsSaved] = useState(true);
  const location = useLocation();
  return (
    <li className="movie-card">
      <div className="movie-card__info">
        <h2 className="movie-card__title">{card.nameRU}</h2>
        <p className="movie-card__duration">{card.duration}</p>
      </div>
      <Link to={card.trailerLink} target="_blank">
        <img
          className="movie-card__img"
          src={card.image.url ? commonImageUrl + card.image.url : card.image}
          alt="изображение фильма"
        />
      </Link>
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
