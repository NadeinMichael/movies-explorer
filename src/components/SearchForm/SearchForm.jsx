import './SearchForm.css';

const SearchForm = () => {
  return (
    <div className="search-form">
      <div className="search-form__container container">
        <form className="search-form__form">
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            required
          />
          <button className="search-form__button button" type="submit">
            Поиск
          </button>
        </form>
        <div className="search-form__checkbox-container">
          <label className="search-form__checkbox-label button">
            <input className="search-form__checkbox " type="checkbox" />
            <span className="search-form__text">Короткометражки</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
