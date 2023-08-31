import { useContext, useEffect, useState } from 'react';

import './Movies.css';

import AppContext from '../../contexts/AppContext';
import Header from '../Header/Header';
import AuthorizedHeaderMenu from '../AuthorizedHeaderMenu/AuthorizedHeaderMenu';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const Movies = () => {
  const {
    isLoading,
    setIsLoading,
    rowMovieList,
    setRowMovieList,
    filteredMovieList,
    setFilteredMovieList,
    getFavoriteMovies,
  } = useContext(AppContext);
  const [searchText, setSearchText] = useState(
    localStorage.getItem('searchText') || ''
  );
  const [shortFilmsOnly, setShortFilmsOnly] = useState(
    JSON.parse(localStorage.getItem('shortFilmsOnly')) || false
  );
  const filteredMoviesFromStore =
    JSON.parse(localStorage.getItem('filteredMovies')) || [];

  useEffect(() => {
    const queryText = searchText.trim().toLowerCase();
    if (queryText) {
      let filteredFilms = rowMovieList.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(queryText) ||
          movie.nameEN.toLowerCase().includes(queryText)
      );
      if (shortFilmsOnly) {
        filteredFilms = filteredFilms.filter((movie) => movie.duration <= 40);
      }

      setFilteredMovieList(filteredFilms);
      localStorage.setItem('filteredMovies', JSON.stringify(filteredFilms));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortFilmsOnly, rowMovieList]);

  return (
    <div className="movies">
      <Header>
        <AuthorizedHeaderMenu />
      </Header>
      <SearchForm
        searchText={searchText}
        setSearchText={setSearchText}
        shortFilmsOnly={shortFilmsOnly}
        setShortFilmsOnly={setShortFilmsOnly}
        setRowMovieList={setRowMovieList}
        filteredMovieList={filteredMovieList}
        setFilteredMovieList={setFilteredMovieList}
        rowMovieList={rowMovieList}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        getFavoriteMovies={getFavoriteMovies}
      />
      <MoviesCardList searchText={searchText} cards={filteredMoviesFromStore} />
      <Footer />
    </div>
  );
};

export default Movies;
