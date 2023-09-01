import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

import { getMovies } from '../../utils/MoviesApi';

const SearchForm = ({
  searchText,
  setSearchText,
  searchTextSave,
  setSearchTextSave,
  shortFilmsOnly,
  setShortFilmsOnly,
  shortFilmsOnlySave,
  setShortFilmsOnlySave,
  setFavoriteSavedMovies,
  setRowMovieList,
  favoriteMoviesList,
  setIsLoading,
  setIsRequest,
}) => {
  const location = useLocation();
  const [isEmptyInput, setIsEmptyInput] = useState(false);

  const handleInputChange = (event) => {
    if (location.pathname === '/movies') {
      setSearchText(event.target.value);
    } else {
      setSearchTextSave(event.target.value);
    }
  };

  const togglerShortFilms = (e) => {
    if (location.pathname === '/movies') {
      setShortFilmsOnly(e.target.checked);
      localStorage.setItem('shortFilmsOnly', e.target.checked);
    } else {
      setShortFilmsOnlySave(e.target.checked);
      localStorage.setItem('shortFilmsOnlySave', e.target.checked);
    }
  };

  const getAllMoviesFromApi = (e) => {
    e.preventDefault();
    if (!searchText.trim().length) {
      setIsEmptyInput(true);
      setSearchText('');
      return;
    } else {
      setIsLoading(true);
      setIsEmptyInput(false);
      if (localStorage.getItem('rowMovies')) {
        setIsLoading(false);
        setIsRequest(true);
        localStorage.setItem('searchText', searchText);
      } else {
        getMovies()
          .then((res) => {
            localStorage.setItem('rowMovies', JSON.stringify(res));
            setRowMovieList(res);
            localStorage.setItem('searchText', searchText);
            setIsRequest(true);
          })
          .catch((err) => {
            alert('Произошла ошибка на сервере, повторите запрос');
            console.log(err);
          })
          .finally(() => setIsLoading(false));
      }
    }
  };

  const searchInSavedMovies = (e) => {
    e.preventDefault();
    if (!searchTextSave.trim().length) {
      setIsEmptyInput(true);
      setSearchTextSave('');
    } else {
      setIsEmptyInput(false);
      const queryText = searchTextSave.trim().toLowerCase();
      if (queryText) {
        let filteredFilms = favoriteMoviesList.filter(
          (movie) =>
            movie.nameRU.toLowerCase().includes(queryText) ||
            movie.nameEN.toLowerCase().includes(queryText)
        );
        setFavoriteSavedMovies(filteredFilms);
      }
    }
  };

  return (
    <div className="search-form">
      <div className="search-form__container container">
        <form
          className="search-form__form"
          noValidate
          onSubmit={
            location.pathname === '/movies'
              ? getAllMoviesFromApi
              : searchInSavedMovies
          }
        >
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            required
            value={
              location.pathname === '/movies' ? searchText : searchTextSave
            }
            onChange={handleInputChange}
          />
          <button className="search-form__button button" type="submit">
            Поиск
          </button>
        </form>
        <span className="search-form__error form__error">
          {isEmptyInput && 'Нужно ввести ключевое слово'}
        </span>
        <div className="search-form__checkbox-container">
          <label className="search-form__checkbox-label button">
            <input
              className="search-form__checkbox "
              type="checkbox"
              onChange={togglerShortFilms}
              checked={
                location.pathname === '/movies'
                  ? shortFilmsOnly
                  : shortFilmsOnlySave
              }
            />
            <span className="search-form__text">Короткометражки</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
