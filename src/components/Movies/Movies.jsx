import './Movies.css';
import Header from '../Header/Header';
import AuthorizedHeaderMenu from '../AuthorizedHeaderMenu/AuthorizedHeaderMenu';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import MoviesCard from '../MoviesCard/MoviesCard';

const Movies = ({ isOpen, handleBurgerMenuClick }) => {
  return (
    <div className="movies">
      <Header>
        <AuthorizedHeaderMenu
          isOpen={isOpen}
          handleBurgerMenuClick={handleBurgerMenuClick}
        />
      </Header>
      <SearchForm />
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
