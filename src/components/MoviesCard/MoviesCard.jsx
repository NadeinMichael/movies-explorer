import { useState, useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import './MoviesCard.css';
import AppContext from '../../contexts/AppContext';
import { commonImageUrl } from '../../constants';

const MoviesCard = ({ card }) => {
  const { favoriteMoviesList, saveFavoriteMovie, removeFavoriteMovie } =
    useContext(AppContext);
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();

  const favoriteCard = favoriteMoviesList?.find(
    (movie) => movie.movieId === card.id || card._id
  );

  useEffect(() => {
    if (favoriteCard) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [favoriteMoviesList, favoriteCard]);

  const formatDuration = (duration) => {
    const min = duration % 60;
    const hour = Math.floor(duration / 60);
    return hour ? `${hour}ч ${min}м` : `${min}м`;
  };

  return (
    <li className='movie-card'>
      <div className='movie-card__info'>
        <h2 className='movie-card__title'>{card.nameRU}</h2>
        <p className='movie-card__duration'>{formatDuration(card.duration)}</p>
      </div>
      <Link
        className='movie-card__img-link'
        to={card.trailerLink}
        target='_blank'
      >
        <img
          className='movie-card__img'
          src={card.image.url ? commonImageUrl + card.image.url : card.image}
          alt='изображение фильма'
        />
      </Link>
      {isSaved ? (
        (location.pathname === '/movies' && (
          <button
            onClick={() => removeFavoriteMovie(card, favoriteCard)}
            className='movie-card__button movie-card__button_saved button'
          >
            ✔
          </button>
        )) ||
        (location.pathname === '/saved-movies' && (
          <button
            className='movie-card__button movie-card__button_delete button'
            onClick={() => removeFavoriteMovie(card, favoriteCard)}
          >
            ✖
          </button>
        ))
      ) : (
        <button
          onClick={() => saveFavoriteMovie(card, favoriteCard)}
          className='movie-card__button button'
        >
          Сохранить
        </button>
      )}
    </li>
  );
};

export default MoviesCard;
