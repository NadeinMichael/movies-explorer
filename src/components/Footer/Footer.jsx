import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__content">
          <p className="footer__text">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
        </div>
        <div className="footer__links">
          <p className="footer__year">&copy; 2020</p>
          <ul className="footer__list">
            <li className="footer__list-item">
              <a
                className="footer__link link"
                href="https://praktikum.yandex.ru/"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__list-item">
              <a
                className="footer__link link"
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
