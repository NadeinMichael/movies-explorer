import './AboutMe.css';

const AboutMe = () => {
  return (
    <div className='about-me'>
      <div className='about-me__container container'>
        <div className='about-me__header main-template__header'>
          <h2 className='about-me__title main-template__title'>Студент</h2>
        </div>
        <div className='about-me__info'>
          <div className='about-me__info-container'>
            <h3 className='about-me__info-title'>Михаил</h3>
            <p className='about-me__info-subtitle'>
              Фронтенд-разработчик, 29 лет
            </p>
            <p className='about-me__info-text'>
              Я родился в городе Ставрополь. У меня есть жена и сын. Недавно
              начал кодить. С 2014 года я посвящал свою жизнь кулинарии и за
              этот период проработал в топовых ресторанах Санкт-Петербурга и
              Краснодара. Так же совершенствовал свои навыки, проходя стажировки
              в ресторанах Латинской Америки. Работа на кухне позволила мне
              обрести такие навыки, как внимательность к деталям, грамотное
              распределение рабочего времени и рабочих процессов,
              ответственность и трудолюбие. В сентябре 2022 года я решил
              кординально изменить свою жизнь и связать ее с работой в digital
              сегменте. Проходя курс по веб-разработке, обучился основам
              фронтенда, и на данный момент продолжаю улучшать приобретенные
              навыки.
            </p>
            <a
              className='about-me__info-link link'
              href='https://github.com/NadeinMichael'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </div>
          <div className='about-me__info-photo'></div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
