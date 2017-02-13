import React from 'react';
import { Link } from 'react-router';
import { Fixed, Toolbar, NavItem } from 'rebass';

<<<<<<< HEAD
export default () => (
  <Fixed top left right zIndex={1}>
    <Toolbar>
      <NavItem to="/" is={Link} children="Home" />
      <NavItem to="/about" is={Link} children="About" />
    </Toolbar>
  </Fixed>
);
=======
function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
           <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
>>>>>>> Commit for the merge
