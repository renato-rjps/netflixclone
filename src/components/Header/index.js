import React from 'react';
import './Header.css';
import userPlaceholder from '../../assets/userPlaceholder.png'
import logo from '../../assets/logo.png'

function Header({ black }) {
  return (
    <header className={black ? 'black' : ''}>
      <div className="header--logo">
        <a href="/">
          <img alt="logo" src={logo}></img>
        </a>
      </div>

      <div className="header--user">
        <img alt="user" src={userPlaceholder} />
      </div>
    </header>
  );
}

export default Header;
