import './Portfolio.css';

const Portfolio = () => {
  return (
    <div className='portfolio'>
      <div className='portfolio__container container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <li className='portfolio__list-item'>
            <a
              className='portfolio__link link'
              href='https://nadeinmichael.github.io/airpods-lending/'
              target='_blank'
              rel='noreferrer'
            >
              <p className='portfolio__link-text'>Статичный сайт</p>
              <p className='portfolio__link-arrow'>&#8599;</p>
            </a>
          </li>
          <li className='portfolio__list-item'>
            <a
              className='portfolio__link link'
              href='https://nadeinmichael.github.io/responsive-website-Travel-/'
              target='_blank'
              rel='noreferrer'
            >
              <p className='portfolio__link-text'>Адаптивный сайт</p>
              <p className='portfolio__link-arrow'>&#8599;</p>
            </a>
          </li>
          <li className='portfolio__list-item'>
            <a
              className='portfolio__link link'
              href='https://github.com/VladTolmachev/react-mesto-api-full-gha'
              target='_blank'
              rel='noreferrer'
            >
              <p className='portfolio__link-text'>Одностраничное приложение</p>
              <p className='portfolio__link-arrow'>&#8599;</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Portfolio;
