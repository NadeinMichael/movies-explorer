import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AppContext from '../../contexts/AppContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [rowMovieList, setRowMovieList] = useState(
    JSON.parse(localStorage.getItem('rowMovies')) || []
  ); //весь список фильмов от Api
  const [filteredMovieList, setFilteredMovieList] = useState([]); //отсоритрованный список фильмов по запросу
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]); // список сохраненных фильмов
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [firstEnter, setFirstEnter] = useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const [searchText, setSearchText] = useState(
    localStorage.getItem('searchText') || ''
  );
  const [isEmptyInput, setIsEmptyInput] = useState(false);
  const filteredMoviesFromStore =
    JSON.parse(localStorage.getItem('filteredMovies')) || [];

  const navigate = useNavigate();
  const location = useLocation();

  const handleBurgerMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleRegister = (name, email, password, reset) => {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
        reset();
      })
      .catch((error) => {
        console.error('handleRegister ', error);
        setErrorMessage('Неверный логин или пароль');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = (email, password, reset) => {
    mainApi
      .authorize(email, password)
      .then((data) => {
        setIsLoading(true);
        localStorage.setItem('token', data.token);
        setCurrentUser({
          ...currentUser,
          name: data.user.name,
          email: data.user.email,
        });
        setErrorMessage('');
        setFirstEnter(true);
        reset();
      })
      .catch((error) => {
        console.error('handleLogin ', error);
        setErrorMessage('Неверный логин или пароль');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi
        .checkJwt(token)
        .then((data) => {
          setCurrentUser({
            name: data.name,
            email: data.email,
            _id: data._id,
          });
        })
        .then(() => {
          setLoggedIn(true);
          if (firstEnter) {
            navigate('/movies');
            setFirstEnter(false);
          } else {
            navigate(location.pathname);
          }
        })
        .catch((err) => console.log('check Token error:', err));
    }
  };

  const getAllMoviesFromApi = (e) => {
    e.preventDefault();
    if (!searchText.trim().length) {
      setIsEmptyInput(true);
      setSearchText('');
      return;
    } else {
      setIsLoading(true);
      setIsEmptyInput(false);
      if (localStorage.getItem('rowMovies')) {
        setIsLoading(false);
        setIsRequest(true);
        localStorage.setItem('searchText', searchText);
      } else {
        getMovies()
          .then((res) => {
            localStorage.setItem('rowMovies', JSON.stringify(res));
            setRowMovieList(res);
            localStorage.setItem('searchText', searchText);
            setIsRequest(true);
          })
          .catch((err) => {
            alert('Произошла ошибка на сервере, повторите запрос');
            console.log(err);
          })
          .finally(() => setIsLoading(false));
      }
    }
  };

  const saveFavoriteMovie = (card, favoriteCard) => {
    if (!favoriteCard) {
      mainApi
        .addFavoriteMovie({
          country: card.country,
          director: card.director,
          duration: card.duration,
          year: card.year,
          description: card.description,
          image: 'https://api.nomoreparties.co' + card.image.url,
          trailer: card.trailerLink,
          thumbnail: 'https://api.nomoreparties.co' + card.image.url,
          movieId: card.id,
          nameRU: card.nameRU,
          nameEN: card.nameEN,
        })
        .then((savedMovie) => {
          const newFavoriteList = [savedMovie, ...favoriteMoviesList];
          setFavoriteMoviesList(newFavoriteList);
        })
        .catch(console.error);
    }
  };

  const removeFavoriteMovie = (card, favoriteCard) => {
    if (favoriteCard) {
      mainApi
        .deleteFavoriteMovie(card.id || card.movieId)
        .then((deletedCard) => {
          const newFavoriteList = favoriteMoviesList.filter(
            (movie) => movie.movieId !== deletedCard.movieId
          );
          setFavoriteMoviesList(newFavoriteList);
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getFavoriteMovies()
        .then((res) => {
          setFavoriteMoviesList(res);
        })
        .catch((err) => console.error('getFavoriteMovies', err));
    }
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstEnter]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        loggedIn,
        errorMessage,
        setErrorMessage,
        setLoggedIn,
        isOpen,
        handleBurgerMenuClick,
        rowMovieList,
        setRowMovieList,
        filteredMovieList,
        setFilteredMovieList,
        setIsLoading,
        favoriteMoviesList,
        setFavoriteMoviesList,
        isRequest,
        setIsRequest,
        searchText,
        setSearchText,
        getAllMoviesFromApi,
        isEmptyInput,
        setIsEmptyInput,
        saveFavoriteMovie,
        removeFavoriteMovie,
        filteredMoviesFromStore,
      }}
    >
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className={isOpen ? 'app open-menu' : 'app'}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route
              path='/movies'
              element={<ProtectedRoute component={<Movies />} />}
            />
            <Route
              path='/saved-movies'
              element={<ProtectedRoute component={<SavedMovies />} />}
            />
            <Route
              path='/profile'
              element={<ProtectedRoute component={<Profile />} />}
            />
            {!loggedIn && (
              <Route
                path='/signup'
                element={<Register handleRegister={handleRegister} />}
              />
            )}
            {!loggedIn && (
              <Route
                path='/signin'
                element={<Login handleLogin={handleLogin} />}
              />
            )}
            <Route path='*' element={<ErrorPage loggedIn={loggedIn} />} />
          </Routes>
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
