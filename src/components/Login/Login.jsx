import { Link } from 'react-router-dom';

import './Login.css';
import logo from '../../images/logo.svg';

const Login = () => {
  return (
    <div className="login">
      <div className="login__container template__container">
        <Link className="login__logo-link template__logo-link" to="/">
          <img
            className="login__logo template__logo"
            src={logo}
            alt="логотип"
          />
        </Link>
        <h1 className="login__title form__title">Рады видеть!</h1>
        <form className="login__form form">
          <label className="login__label form__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="login__input form__input"
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            required
          />
          <span className="login__error form__error"></span>
          <label className="login__label form__label" htmlFor="password">
            Пароль
          </label>
          <input
            className="login__input form__input"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            required
          />
          <span className="login__error form__error"></span>
        </form>
        <div className="login__button-container">
          <button className="login__button form__button button">Войти</button>
          <p className="login__text form__text">
            Ещё не зарегистрированы?
            <Link className="login__link link form__link" to="/signup">
              Регистрация
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
