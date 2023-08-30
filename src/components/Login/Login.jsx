import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './Login.css';
import logo from '../../images/logo.svg';
import AppContext from '../../contexts/AppContext';

const Login = ({ handleLogin }) => {
  const {errorMessage} = useContext(AppContext)
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onChange' });

  function onSubmit({ email, password }) {
    handleLogin(email, password);
    reset();
  }

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
        <form className="login__form form" onSubmit={handleSubmit(onSubmit)}>
          <label className="login__label form__label" htmlFor="email">
            E-mail
          </label>
          <input
            {...register('email', {
              required: 'Обязательное поле',
              pattern: {
                value:
                  /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                message: 'Введите валидный Email',
              },
            })}
            className="login__input form__input"
            id="email"
            placeholder="example@gmail.com"
          />
          <span className="login__error form__error">
            {errors?.email && (errors?.email?.message || 'error')}
          </span>
          <label className="login__label form__label" htmlFor="password">
            Пароль
          </label>
          <input
            {...register('password', {
              required: 'Обязательное поле',
              minLength: {
                value: 3,
                message: 'Поле должно содержать минимум 3 символа',
              },
              maxLength: {
                value: 20,
                message: 'Поле превышает максимальное кол-во символов',
              },
            })}
            className="login__input form__input"
            id="password"
            type="password"
            placeholder="Пароль"
          />
          <span className="login__error form__error">
            {errors?.password && (errors?.password?.message || 'error')}
          </span>
          <div className="login__button-container">
          <p className='login__error-message'>{errorMessage}</p>
            <button
              className="login__button form__button button"
              type="submit"
              disabled={!isValid}
            >
              Войти
            </button>
            <p className="login__text form__text">
              Ещё не зарегистрированы?
              <Link className="login__link link form__link" to="/signup">
                Регистрация
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
