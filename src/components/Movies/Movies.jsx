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
  } = useContext(AppContext);
  const [searchText, setSearchText] = useState('');
  const [shortFilmsOnly, setShortFilmsOnly] = useState(false);

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
    }
  }, [searchText, rowMovieList]);

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
      />
      <MoviesCardList searchText={searchText} cards={filteredMovieList} />
      <Footer />
    </div>
  );
};

export default Movies;
