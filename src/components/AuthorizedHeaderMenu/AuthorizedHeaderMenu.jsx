import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './AuthorizedHeaderMenu.css';

import AppContext from '../../contexts/AppContext';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const AuthorizedHeaderMenu = () => {
  const location = useLocation();
  const { isOpen, handleBurgerMenuClick } = useContext(AppContext);

  return (
    <>
      <ul
        className={
          isOpen
            ? 'header__list header__nav'
            : 'header__list header__nav header__list_closed'
        }
      >
        <li
          className={
            location.pathname === '/'
              ? 'header__item header__item-main header__item_active'
              : 'header__item header__item-main'
          }
        >
          <Link className="header__menu-link link" to="/">
            Главная
          </Link>
        </li>
        <li
          className={
            location.pathname === '/movies'
              ? 'header__item header__item_active'
              : 'header__item'
          }
        >
          <Link className="header__menu-link link" to="/movies">
            Фильмы
          </Link>
        </li>
        <li
          className={
            location.pathname === '/saved-movies'
              ? 'header__item header__item_active'
              : 'header__item'
          }
        >
          <Link className="header__menu-link link" to="/saved-movies">
            Сохранённые фильмы
          </Link>
        </li>
        <li
          className={
            location.pathname === '/profile'
              ? 'header__item header__item-profile header__item_active'
              : 'header__item header__item-profile'
          }
        >
          <Link
            className="header__menu-link header__menu-link_type_profile link"
            to="/profile"
          >
            Аккаунт
          </Link>
        </li>
      </ul>
      <BurgerMenu />
      <div
        onClick={handleBurgerMenuClick}
        className={isOpen ? 'overlay' : 'overlay overlay_close'}
      ></div>
    </>
  );
};

export default AuthorizedHeaderMenu;
