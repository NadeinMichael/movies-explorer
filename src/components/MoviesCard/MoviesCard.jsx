import { useState, useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import './MoviesCard.css';
import AppContext from '../../contexts/AppContext';
import { commonImageUrl } from '../../constants';
import mainApi from '../../utils/MainApi';

const MoviesCard = ({ card }) => {
  const { favoriteMoviesList, setFavoriteMoviesList } = useContext(AppContext);
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();

  const FavoriteCard = favoriteMoviesList?.find(
    (movie) => movie.movieId === card.id
  );

  useEffect(() => {
    if (FavoriteCard) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [favoriteMoviesList, FavoriteCard]);

  const formatDuration = (duration) => {
    const min = duration % 60;
    const hour = Math.floor(duration / 60);
    return hour ? `${hour}ч ${min}м` : `${min}м`;
  };

  const addFavoriteMovie = (card) => {
    if (!FavoriteCard) {
      mainApi
        .addFavoriteMovie({
          country: card.country,
          director: card.director,
          duration: card.duration,
          year: card.year,
          description: card.description,
          image: 'https://api.nomoreparties.co' + card.image.url,
          trailer: card.trailerLink,
          thumbnail: 'https://api.nomoreparties.co' + card.image.url,
          movieId: card.id,
          nameRU: card.nameRU,
          nameEN: card.nameEN,
        })
        .then((savedMovie) => {
          const newFavoriteList = [savedMovie, ...favoriteMoviesList];
          setFavoriteMoviesList(newFavoriteList);
        })
        .catch(console.error);
    }
  };

  const deleteFavoriteMovie = (card) => {
    if (FavoriteCard) {
      mainApi.deleteFavoriteMovie(card.id).then(() => {
        const newFavoriteList = favoriteMoviesList.filter(
          (movie) => movie.movieId !== card.id
        );
        setFavoriteMoviesList(newFavoriteList);
      });
    }
  };

  return (
    <li className="movie-card">
      <div className="movie-card__info">
        <h2 className="movie-card__title">{card.nameRU}</h2>
        <p className="movie-card__duration">{formatDuration(card.duration)}</p>
      </div>
      <Link
        className="movie-card__img-link"
        to={card.trailerLink}
        target="_blank"
      >
        <img
          className="movie-card__img"
          src={card.image.url ? commonImageUrl + card.image.url : card.image}
          alt="изображение фильма"
        />
      </Link>
      {isSaved ? (
        (location.pathname === '/movies' && (
          <button
            onClick={() => deleteFavoriteMovie(card)}
            className="movie-card__button movie-card__button_saved button"
          >
            ✔
          </button>
        )) ||
        (location.pathname === '/saved-movies' && (
          <button className="movie-card__button movie-card__button_delete button">
            ✖
          </button>
        ))
      ) : (
        <button
          onClick={() => addFavoriteMovie(card)}
          className="movie-card__button button"
        >
          Сохранить
        </button>
      )}
    </li>
  );
};

export default MoviesCard;
