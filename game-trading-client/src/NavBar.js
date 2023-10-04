

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/games">Games</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}

export default NavBar;
