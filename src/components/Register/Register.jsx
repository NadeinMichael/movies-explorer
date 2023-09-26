import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';

import './Register.css';
import logo from '../../images/logo.svg';

import AppContext from '../../contexts/AppContext';

const Register = ({ handleRegister }) => {
  const { errorMessage, setErrorMessage, isLoading } = useContext(AppContext);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onChange' });

  function onSubmit({ name, email, password }) {
    handleRegister(name, email, password, reset);
  }

  useEffect(() => {
    setErrorMessage('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='register'>
      <div className='register__container template__container'>
        <Link className='register__logo-link template__logo-link' to='/'>
          <img
            className='register__logo template__logo'
            src={logo}
            alt='логотип'
          />
        </Link>
        <h1 className='register__title form__title'>Добро пожаловать!</h1>
        <form className='register__form form' onSubmit={handleSubmit(onSubmit)}>
          <label className='register__label form__label' htmlFor='name'>
            Имя
          </label>
          <input
            {...register('name', {
              required: 'Обязательное поле',
              minLength: {
                value: 2,
                message: 'Поле должно содержать минимум 2 символа',
              },
              maxLength: {
                value: 30,
                message: 'Поле превышает максимальное кол-во символов',
              },
            })}
            className='register__input form__input'
            id='name'
            placeholder='Иван'
          />
          <span className='register__error form__error'>
            {errors?.name && (errors?.name?.message || 'error')}
          </span>
          <label className='register__label form__label' htmlFor='email'>
            E-mail
          </label>
          <input
            {...register('email', {
              required: 'Обязательное поле',
              pattern: {
                value:
                  /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                message: 'Введите валидный Email',
              },
            })}
            className='register__input form__input'
            id='email'
            placeholder='example@gmail.com'
          />
          <span className='register__error form__error'>
            {errors?.email && (errors?.email?.message || 'error')}
          </span>
          <label className='register__label form__label' htmlFor='password'>
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
            className='register__input form__input'
            id='password'
            type='password'
            placeholder='Пароль'
          />
          <span className='register__error form__error'>
            {errors?.password && (errors?.password?.message || 'error')}
          </span>
          <div className='register__button-container'>
            <p className='register__error-message'>{errorMessage}</p>
            <button
              className='register__button form__button button'
              type='submit'
              disabled={!isValid || isLoading}
            >
              Зарегистрироваться
            </button>
            <p className='register__text form__text'>
              Уже зарегистрированы?
              <Link className='register__link link form__link' to='/signin'>
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
