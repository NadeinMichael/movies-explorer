import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './Profile.css';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import AppContext from '../../contexts/AppContext';
import Header from '../Header/Header';
import AuthorizedHeaderMenu from '../AuthorizedHeaderMenu/AuthorizedHeaderMenu';
import mainApi from '../../utils/MainApi';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { setLoggedIn, setRowMovieList, setFavoriteMoviesList, setSearchText } =
    useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [successfulMessage, setSuccessfulMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    },
  });

  function onSubmit({ name, email }) {
    mainApi
      .editProfile({ name, email })
      .then((updatedUser) => {
        setCurrentUser({ ...updatedUser });
        setEditMode(false);
        setErrorMessage('');
        setSuccessfulMessage('Изменения успешно сохранены!');
      })
      .catch((err) => {
        setSuccessfulMessage('');
        setErrorMessage('На сервере произошла ошибка, повторите запрос');
        console.log(err);
      });
  }

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
    setSearchText('');

    navigate('/');
  };

  const enableEditModeHandler = () => {
    setEditMode(true);
    setSuccessfulMessage('');
    setErrorMessage('');
  };

  useEffect(() => {
    setSuccessfulMessage('');
    setErrorMessage('');
  }, []);

  useEffect(() => {
    reset({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, reset]);

  return (
    <div className="profile">
      <Header>
        <AuthorizedHeaderMenu />
      </Header>
      <div className="profile__container">
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <form className="profile__info" onSubmit={handleSubmit(onSubmit)}>
          <div className="profile__info-item">
            <span className="profile__info-title">Имя</span>
            {editMode ? (
              <input
                {...register('name', {
                  required: 'Обязательное поле',
                  validate: (value, formValues) => {
                    return (
                      value !== currentUser.name ||
                      formValues.email !== currentUser.email ||
                      ' '
                    );
                  },
                  minLength: {
                    value: 2,
                    message: 'Поле должно содержать минимум 2 символа',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Поле превышает максимальное кол-во символов',
                  },
                })}
                className="editable-input"
              />
            ) : (
              <span className="editable-span">{currentUser.name}</span>
            )}
          </div>
          <span className="profile__error">
            {errors?.name && (errors?.name?.message || 'error')}
          </span>
          <div className="profile__info-item profile__info-item_type_email">
            <span className="profile__info-title">E-mail</span>
            {editMode ? (
              <input
                {...register('email', {
                  required: 'Обязательное поле',
                  pattern: {
                    value:
                      /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                    message: 'Введите валидный Email',
                  },
                })}
                className="editable-input"
              />
            ) : (
              <span className="editable-span">{currentUser.email}</span>
            )}
          </div>
          <span className="profile__error">
            {errors?.email && (errors?.email?.message || 'error')}
          </span>
          <div className="profile__buttons">
            <p className="profile__successful-message">
              {successfulMessage || errorMessage}
            </p>
            {!editMode ? (
              <>
                <p className="profile__edit" onClick={enableEditModeHandler}>
                  Редактировать
                </p>
                <button
                  className="profile__button profile__button_exit button"
                  type="button"
                  onClick={exitHandler}
                >
                  Выйти из аккаунта
                </button>
              </>
            ) : (
              <button
                className="profile__button_save button"
                type="submit"
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid}
              >
                Сохранить
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
