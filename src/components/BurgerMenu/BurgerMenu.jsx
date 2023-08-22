import './BurgerMenu.css';

const BurgerMenu = ({ isOpen, handleBurgerMenuClick }) => {
  return (
    <div
      onClick={handleBurgerMenuClick}
      className={isOpen ? 'burger-menu_open' : 'burger-menu_close'}
    ></div>
  );
};

export default BurgerMenu;
