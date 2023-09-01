import './AboutProject.css';

const AboutProject = () => {
  return (
    <div className="about-project main-template" id="About">
      <div className="about-project__container container">
        <div className="project__header main-template__header">
          <h2 className="project__title main-template__title">О проекте</h2>
        </div>
        <div className="about-project__info">
          <div className="about-project__info-column">
            <h3 className="about-project__info-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__info-text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__info-column">
            <h3 className="about-project__info-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__info-text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__progress">
          <div className="about-project__progress-column about-project__progress-column_accent">
            <p className="about-project__progress-text about-project__progress-text_accent">
              1 неделя
            </p>
            <p className="about-project__progress-text about-project__progress-text_type_frontend">
              4 недели
            </p>
          </div>
          <div className="about-project__progress-column about-project__progress-column_bottom">
            <p className="about-project__progress-text about-project__progress-text">
              Back-end
            </p>
            <p className="about-project__progress-text about-project__progress-text">
              Front-end
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
