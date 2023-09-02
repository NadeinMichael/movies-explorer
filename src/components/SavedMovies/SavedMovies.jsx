import { useState, useContext, useEffect } from 'react';

import './SavedMovies.css';

import AppContext from '../../contexts/AppContext';
import Header from '../Header/Header';
import AuthorizedHeaderMenu from '../AuthorizedHeaderMenu/AuthorizedHeaderMenu';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const SavedMovies = () => {
  const [searchTextSave, setSearchTextSave] = useState('');
  const [shortFilmsOnlySave, setShortFilmsOnlySave] = useState(
    JSON.parse(localStorage.getItem('shortFilmsOnlySave')) || false
  );
  const { favoriteMoviesList, setIsRequest } = useContext(AppContext);

  const [favoriteSavedMovies, setFavoriteSavedMovies] =
    useState(favoriteMoviesList);

  useEffect(() => {
    if (shortFilmsOnlySave) {
      const filteredFilms = favoriteSavedMovies.filter(
        (movie) => movie.duration <= 40
      );
      setFavoriteSavedMovies(filteredFilms);
    } else {
      setFavoriteSavedMovies(favoriteMoviesList);
    }

    setIsRequest(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortFilmsOnlySave, favoriteMoviesList]);

  return (
    <div className="saved-movies">
      <Header>
        <AuthorizedHeaderMenu />
      </Header>
      <SearchForm
        searchTextSave={searchTextSave}
        setSearchTextSave={setSearchTextSave}
        shortFilmsOnlySave={shortFilmsOnlySave}
        setShortFilmsOnlySave={setShortFilmsOnlySave}
        favoriteSavedMovies={favoriteSavedMovies}
        setFavoriteSavedMovies={setFavoriteSavedMovies}
        favoriteMoviesList={favoriteMoviesList}
        setIsRequest={setIsRequest}
      />
      <MoviesCardList cards={favoriteSavedMovies} searchText={searchTextSave} />
      <Footer />
    </div>
  );
};

export default SavedMovies;
