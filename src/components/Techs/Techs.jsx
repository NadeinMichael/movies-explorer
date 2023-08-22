import './Techs.css';

const Techs = () => {
  return (
    <div className="techs main-template">
      <div className="techs__container container">
        <div className="techs__header main-template__header">
          <h2 className="techs__title main-template__title">Технологии</h2>
        </div>
        <div className="techs__info">
          <h3 className="techs__info-title">7 технологий</h3>
          <p className="techs__info-text">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
          <ul className="techs__list">
            <li className="techs__list-item">HTML</li>
            <li className="techs__list-item">CSS</li>
            <li className="techs__list-item">JS</li>
            <li className="techs__list-item">React</li>
            <li className="techs__list-item">Git</li>
            <li className="techs__list-item">Express.js</li>
            <li className="techs__list-item">mongoDB</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Techs;
