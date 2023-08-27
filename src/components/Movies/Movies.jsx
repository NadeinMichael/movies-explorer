import { useContext, useEffect, useState } from 'react';

import './Movies.css';

import AppContext from '../../contexts/AppContext';
import Header from '../Header/Header';
import AuthorizedHeaderMenu from '../AuthorizedHeaderMenu/AuthorizedHeaderMenu';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import MoviesCard from '../MoviesCard/MoviesCard';

const Movies = () => {
  const [searchText, setSearchText] = useState('');
  const [shortFilmsOnly, setShortFilmsOnly] = useState(false);
  const [rowMovieList, setRowMovieList] = useState([]);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //   }
  // }, []);

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
        rowMovieList={rowMovieList}
      />
      <MoviesCardList>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </MoviesCardList>
      <Footer />
    </div>
  );
};

export default Movies;
