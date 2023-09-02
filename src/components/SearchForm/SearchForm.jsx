import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

import AppContext from '../../contexts/AppContext';

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
  favoriteMoviesList,
  setIsRequest,
}) => {
  const location = useLocation();
  const { getAllMoviesFromApi, isEmptyInput, setIsEmptyInput } =
    useContext(AppContext);

  const handleInputChange = (event) => {
    if (location.pathname === '/movies') {
      setSearchText(event.target.value);
    } else {
      setSearchTextSave(event.target.value);
    }
  };

  const togglerShortFilms = (e) => {
    setIsRequest(true);
    if (location.pathname === '/movies') {
      setShortFilmsOnly(e.target.checked);
      localStorage.setItem('shortFilmsOnly', e.target.checked);
    } else {
      setShortFilmsOnlySave(e.target.checked);
      localStorage.setItem('shortFilmsOnlySave', e.target.checked);
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
