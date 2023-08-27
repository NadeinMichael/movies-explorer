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
  const { setLoggedIn } = useContext(AppContext);
  const [updatedUser, setUpdatedUser] = useState(currentUser);

  const [editMode, setEditMode] = useState(false);

  const exitHandler = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
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
        .then((res) => setCurrentUser({ ...updatedUser }));
    } else {
      setEditMode(false);
    }
  };

  const handlerInputChange = (newInputValue, inputId) => {
    switch (inputId) {
      case 'currentUser.name':
        setUpdatedUser({ ...updatedUser, name: newInputValue });
        break;
      case 'currentUser.email':
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
            />
          </li>
          <li className="profile__info-item">
            <span className="profile__info-title">E-mail</span>
            <EditableSpan
              editMode={editMode}
              title={updatedUser.email}
              handlerInputChange={handlerInputChange}
              inputId="currentUser.email"
            />
          </li>
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
