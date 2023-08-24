import { Link } from 'react-router-dom';
import './UnauthorizedHeaderMenu.css';

const UnauthorizedHeaderMenu = () => {
  return (
    <ul className="header__auth-list header__nav">
      <li className="header__auth-item">
        <Link className="header__menu-link link" to="/signup">
          Регистрация
        </Link>
      </li>
      <li className="header__auth-item header__auth-item_accent">
        <Link className="header__menu-link_accent link" to="/signin">
          Войти
        </Link>
      </li>
    </ul>
  );
};

export default UnauthorizedHeaderMenu;
