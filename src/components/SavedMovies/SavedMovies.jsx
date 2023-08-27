import './SavedMovies.css';

import Header from '../Header/Header';
import AuthorizedHeaderMenu from '../AuthorizedHeaderMenu/AuthorizedHeaderMenu';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const SavedMovies = () => {
  return (
    <div className="saved-movies">
      <Header>
        <AuthorizedHeaderMenu />
      </Header>
      <SearchForm />
      <MoviesCardList>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </MoviesCardList>
      <Footer />
    </div>
  );
};

export default SavedMovies;
