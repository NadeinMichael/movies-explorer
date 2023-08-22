import { useState } from 'react';

import './Profile.css';

import Header from '../Header/Header';
import AuthorizedHeaderMenu from '../AuthorizedHeaderMenu/AuthorizedHeaderMenu';
import EditableSpan from '../EditableSpan/EditableSpan';
import Footer from '../Footer/Footer';

const Profile = ({ isOpen, handleBurgerMenuClick }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="profile">
      <Header>
        <AuthorizedHeaderMenu
          isOpen={isOpen}
          handleBurgerMenuClick={handleBurgerMenuClick}
        />
      </Header>
      <div className="profile__container">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <ul className="profile__info">
          <li className="profile__info-item">
            <span className="profile__info-title">Имя</span>
            <EditableSpan editMode={editMode} title="Виталий" />
          </li>
          <li className="profile__info-item">
            <span className="profile__info-title">E-mail</span>
            <EditableSpan editMode={editMode} title="pochta@yandex.ru" />
          </li>
        </ul>
        <div className="profile__buttons">
          <button className="profile__button button">Редактировать</button>
          <button className="profile__button profile__button_exit button">
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
