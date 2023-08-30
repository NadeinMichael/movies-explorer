import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './Profile.css';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import AppContext from '../../contexts/AppContext';
import Header from '../Header/Header';
import AuthorizedHeaderMenu from '../AuthorizedHeaderMenu/AuthorizedHeaderMenu';
import EditableSpan from '../EditableSpan/EditableSpan';
import mainApi from '../../utils/MainApi';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { setLoggedIn, setRowMovieList, setFavoriteMoviesList } =
    useContext(AppContext);
  const [updatedUser, setUpdatedUser] = useState(currentUser);
  const [editMode, setEditMode] = useState(false);

  const [errorEmail, setErrorEmail] = useState('');
  const [errorName, setErrorName] = useState('');
  const emailPattern = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;

  const exitHandler = () => {
    setLoggedIn(false);
    localStorage.clear();
    setRowMovieList([]);
    setCurrentUser({
      name: '',
      email: '',
      _id: '',
    });
    setFavoriteMoviesList([]);

    navigate('/');
  };

  const enableEditModeHandler = () => {
    setEditMode(true);
  };

  const saveProfileChanges = () => {
    if (
      currentUser.name !== updatedUser.name ||
      currentUser.email !== updatedUser.email
    ) {
      setEditMode(false);
      mainApi
        .editProfile({ ...updatedUser })
        .then((res) => setCurrentUser({ ...updatedUser }))
        .catch((err) => console.log(err));
    } else {
      setEditMode(false);
    }
  };

  const handlerInputChange = (newInputValue, inputId) => {
    switch (inputId) {
      case 'currentUser.name':
        if (newInputValue.length === 0) {
          setErrorName('Поле имени не может быть пустым');
          break;
        }
        setErrorName('');
        setUpdatedUser({ ...updatedUser, name: newInputValue });
        break;
      case 'currentUser.email':
        if (!emailPattern.test(newInputValue) || newInputValue.length === 0) {
          setErrorEmail('Введен некорректный email');
          break;
        }
        setErrorEmail('');
        setUpdatedUser({ ...updatedUser, email: newInputValue });
        break;
      default:
        break;
    }
  };

  return (
    <div className="profile">
      <Header>
        <AuthorizedHeaderMenu />
      </Header>
      <div className="profile__container">
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <ul className="profile__info">
          <li className="profile__info-item">
            <span className="profile__info-title">Имя</span>
            <EditableSpan
              editMode={editMode}
              title={updatedUser.name}
              handlerInputChange={handlerInputChange}
              inputId="currentUser.name"
              type="text"
            />
          </li>
          {errorName && <span className="profile__error">{errorName}</span>}
          <li className="profile__info-item">
            <span className="profile__info-title">E-mail</span>
            <EditableSpan
              editMode={editMode}
              title={updatedUser.email}
              handlerInputChange={handlerInputChange}
              inputId="currentUser.email"
              type="email"
            />
          </li>
          {errorEmail && <span className="profile__error">{errorEmail}</span>}
        </ul>
        <div className="profile__buttons">
          {!editMode ? (
            <>
              <button
                className="profile__button button"
                onClick={enableEditModeHandler}
              >
                Редактировать
              </button>
              <button
                className="profile__button profile__button_exit button"
                onClick={exitHandler}
              >
                Выйти из аккаунта
              </button>
            </>
          ) : (
            <button
              className="profile__button_save button"
              onClick={saveProfileChanges}
            >
              Сохранить
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
