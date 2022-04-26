import React from 'react';
import logo from '../images/logo.svg';

function Header() {
  return (
    <header class="header">
      <a href="#" class="header__link">
        <img src={logo} alt="Надпись: Место. Россия" class="header__logo" />
      </a>
    </header>
  );
}

export default Header;