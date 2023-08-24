import { Link } from 'react-router-dom';
import './Header.css';

import logo from '../../images/logo.svg';

const Header = ({ children }) => {
  return (
    <header className="header">
      <div className="header__container container">
        <Link className="header__link link" to="/">
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>
        <nav className="header__menu">{children}</nav>
      </div>
    </header>
  );
};

export default Header;
