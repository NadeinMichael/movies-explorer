import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

import { getMovies } from '../../utils/MoviesApi';

const SearchForm = ({
  searchText,
  setSearchText,
  shortFilmsOnly,
  setShortFilmsOnly,
  setRowMovieList,
  filteredMovieList,
  setFilteredMovieList,
  rowMovieList,
  isLoading,
  setIsLoading,
}) => {
  const location = useLocation();
  const [isEmptyInput, setIsEmptyInput] = useState(false);

  const handleInputChange = (event) => {
    if (location.pathname === '/movies') {
      setSearchText(event.target.value);
    }
  };

  const togglerShortFilms = () => {
    if (location.pathname === '/movies') {
      setShortFilmsOnly(!shortFilmsOnly);
    }
  };

  const getAllMoviesFromApi = (e) => {
    e.preventDefault();

    if (location.pathname === '/movies') {
      if (!searchText.trim().length) {
        setIsEmptyInput(true);
        setSearchText('');
        return;
      } else {
        setIsLoading(true);
        setIsEmptyInput(false);
        getMovies().then((res) => {
          setRowMovieList(res);
          setIsLoading(false);
        });
      }
    }
  };

  return (
    <div className="search-form">
      <div className="search-form__container container">
        <form
          className="search-form__form"
          noValidate
          onSubmit={getAllMoviesFromApi}
        >
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            required
            value={searchText}
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
              onClick={togglerShortFilms}
            />
            <span className="search-form__text">Короткометражки</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
