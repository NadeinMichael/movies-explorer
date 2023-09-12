import { useContext } from 'react';

import './Main.css';

import AppContext from '../../contexts/AppContext';
import AboutProject from '../AboutProject/AboutProject';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import UnauthorizedHeaderMenu from '../UnauthorizedHeaderMenu/UnauthorizedHeaderMenu';
import AuthorizedHeaderMenu from '../AuthorizedHeaderMenu/AuthorizedHeaderMenu';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

const Main = () => {
  const { loggedIn, isOpen } = useContext(AppContext);
  return (
    <main className={isOpen ? 'main open-menu' : 'main'}>
      <Header>
        {loggedIn ? <AuthorizedHeaderMenu /> : <UnauthorizedHeaderMenu />}
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
