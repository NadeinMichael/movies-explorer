import { Link, useNavigate } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <div className="error-page__container">
        <h2 className="error-page__title">404</h2>
        <p className="error-page__text">Страница не найдена</p>
        <Link className="error-page__link link" onClick={() => navigate(-1)}>
          Назад
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
