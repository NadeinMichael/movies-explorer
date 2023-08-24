import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleBurgerMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? 'app open-menu' : 'app'}>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              loggedIn={loggedIn}
              isOpen={isOpen}
              handleBurgerMenuClick={handleBurgerMenuClick}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={
                <Movies
                  isOpen={isOpen}
                  handleBurgerMenuClick={handleBurgerMenuClick}
                />
              }
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={
                <SavedMovies
                  isOpen={isOpen}
                  handleBurgerMenuClick={handleBurgerMenuClick}
                />
              }
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={
                <Profile
                  isOpen={isOpen}
                  handleBurgerMenuClick={handleBurgerMenuClick}
                />
              }
            />
          }
        />
        <Route path="/signin" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
