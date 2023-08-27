import { useContext } from 'react';

import './BurgerMenu.css';

import AppContext from '../../contexts/AppContext';

const BurgerMenu = () => {
  const { isOpen, handleBurgerMenuClick } = useContext(AppContext);
  return (
    <div
      onClick={handleBurgerMenuClick}
      className={isOpen ? 'burger-menu_open' : 'burger-menu_close'}
    ></div>
  );
};

export default BurgerMenu;
