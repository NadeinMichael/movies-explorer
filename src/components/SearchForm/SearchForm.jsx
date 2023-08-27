import { useState } from 'react';
import './SearchForm.css';

import { getMovies } from '../../utils/MoviesApi';

const SearchForm = ({
  searchText,
  setSearchText,
  shortFilmsOnly,
  setShortFilmsOnly,
  setRowMovieList,
  rowMovieList,
}) => {
  const [isEmptyInput, setIsEmptyInput] = useState(false);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const togglerShortFilms = () => {
    setShortFilmsOnly(!shortFilmsOnly);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchText.trim().length) {
      setIsEmptyInput(true);
      setSearchText('');
      return;
    }
    getMovies().then((res) => setRowMovieList(res));
    setSearchText('');
    console.log(1);
  };

  return (
    <div className="search-form">
      <div className="search-form__container container">
        <form className="search-form__form" noValidate onSubmit={handleSubmit}>
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
