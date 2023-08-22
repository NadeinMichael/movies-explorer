import './AboutMe.css';

const AboutMe = () => {
  return (
    <div className="about-me">
      <div className="about-me__container container">
        <div className="about-me__header main-template__header">
          <h2 className="about-me__title main-template__title">Студент</h2>
        </div>
        <div className="about-me__info">
          <div className="about-me__info-container">
            <h3 className="about-me__info-title">Виталий</h3>
            <p className="about-me__info-subtitle">
              Фронтенд-разработчик, 30 лет
            </p>
            <p className="about-me__info-text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании
              &#171;СКБ Контур&#187;. После того, как прошёл курс по
              веб-разработке, начал заниматься фриланс-заказами и ушёл с
              постоянной работы.
            </p>
            <a
              className="about-me__info-link link"
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
          <div className="about-me__info-photo"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
