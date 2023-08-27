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
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleBurgerMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleRegister = (name, email, password) => {
    mainApi
      .register(name, email, password)
      .then(() => {
        mainApi.authorize(email, password).then((data) => {
          localStorage.setItem('token', data.token);
          setCurrentUser({ email, name });
          setLoggedIn(true);
          navigate('/movies');
        });
      })
      .catch((error) => console.error('handleRegister ', error));
  };

  const handleLogin = (email, password) => {
    mainApi
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setCurrentUser({
          name: data.user.name,
          email: data.user.email,
        });
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((error) => console.error('handleLogin ', error));
  };

  const checkToken = () => {
    const token = localStorage.getItem('token');
    mainApi.checkJwt(token).then((data) => {
      if (data) {
        setCurrentUser({ name: data.name, email: data.email });
        setLoggedIn(true);
        navigate(location.pathname);
        return;
      } else {
        return setLoggedIn(false);
      }
    });
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        loggedIn,
        setLoggedIn,
        isOpen,
        handleBurgerMenuClick,
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
