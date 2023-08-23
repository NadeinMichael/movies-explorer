import { Link } from 'react-router-dom';

import './Register.css';
import logo from '../../images/logo.svg';

const Register = () => {
  return (
    <div className="register">
      <div className="register__container template__container">
        <Link className="register__logo-link template__logo-link" to="/">
          <img
            className="register__logo template__logo"
            src={logo}
            alt="логотип"
          />
        </Link>
        <h1 className="register__title form__title">Добро пожаловать!</h1>
        <form className="register__form form">
          <label className="register__label form__label" htmlFor="name">
            Имя
          </label>
          <input
            className="register__input form__input"
            id="name"
            name="name"
            type="text"
            placeholder="Иван"
            required
          />
          <span className="register__error form__error"></span>
          <label className="register__label form__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="register__input form__input"
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            required
          />
          <span className="register__error form__error"></span>
          <label className="register__label form__label" htmlFor="password">
            Пароль
          </label>
          <input
            className="register__input form__input"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            required
          />
          <span className="register__error form__error"></span>
          <div className="register__button-container">
            <button className="register__button form__button button">
              Зарегистрироваться
            </button>
            <p className="register__text form__text">
              Уже зарегистрированы?
              <Link className="register__link link form__link" to="/login">
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
