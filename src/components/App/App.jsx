import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AppContext from '../../contexts/AppContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';

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

  console.log(favoriteMoviesList);

  const navigate = useNavigate();
  const location = useLocation();

  const handleBurgerMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleRegister = (name, email, password) => {
    mainApi
      .register(name, email, password)
      .then((res) => {
        mainApi.authorize(email, password).then((data) => {
          localStorage.setItem('token', data.token);
          setCurrentUser({ email, name, _id: res._id });
          setLoggedIn(true);
          setErrorMessage('');
          navigate('/movies');
        });
      })
      .catch((error) => {
        console.error('handleRegister ', error)
        setErrorMessage('Неверный логин или пароль');
    });
  };

  const handleLogin = (email, password) => {
    mainApi
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setCurrentUser({
          ...currentUser,
          name: data.user.name,
          email: data.user.email,
        });
        setErrorMessage('');
        setLoggedIn(true)
        navigate('/movies');
      })
      .catch((error) => {
        console.error('handleLogin ', error);
        setErrorMessage('Неверный логин или пароль');
      });
  };

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi
        .checkJwt(token)
        .then((data) => {
          if (data) {
            setCurrentUser({
              name: data.name,
              email: data.email,
              _id: data._id,
            });
            setLoggedIn(true);
            navigate(location.pathname);
            return;
          } else {
            return setLoggedIn(false);
          }
        })
        .catch((err) => console.log('check Token error:', err));
    }
  };

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getFavoriteMovies().then((res) => {
        setFavoriteMoviesList(res);
      });
    }
  }, [loggedIn]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        loggedIn,
        errorMessage,
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
      }}
    >
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className={isOpen ? 'app open-menu' : 'app'}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={<ProtectedRoute component={<Movies />} />}
            />
            <Route
              path="/saved-movies"
              element={<ProtectedRoute component={<SavedMovies />} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute component={<Profile />} />}
            />
            <Route
              path="/signup"
              element={<Register handleRegister={handleRegister} />}
            />
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
