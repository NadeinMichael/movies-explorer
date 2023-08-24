import { useState } from 'react';

import './Main.css';

import AboutProject from '../AboutProject/AboutProject';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import UnauthorizedHeaderMenu from '../UnauthorizedHeaderMenu/UnauthorizedHeaderMenu';
import AuthorizedHeaderMenu from '../AuthorizedHeaderMenu/AuthorizedHeaderMenu';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

const Main = ({ isOpen, handleBurgerMenuClick }) => {
  const [IsloggedIn, setIsloggedIn] = useState(true);
  return (
    <main className={isOpen ? 'main open-menu' : 'main'}>
      <Header>
        {IsloggedIn ? (
          <AuthorizedHeaderMenu
            isOpen={isOpen}
            handleBurgerMenuClick={handleBurgerMenuClick}
          />
        ) : (
          <UnauthorizedHeaderMenu />
        )}
      </Header>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main>
  );
};

export default Main;
