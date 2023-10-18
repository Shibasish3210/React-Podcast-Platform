import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css'

const Navbar = () => {
  return (
    <nav>
      <ul className='navbar'>
        <li><NavLink to='/'>SignUp / SignIn</NavLink></li>
        <li><NavLink to='/podcasts'>Podcasts</NavLink></li>
        <li><NavLink to='/start-a-podcast'>Start A Podcast</NavLink></li>
        <li><NavLink to='/profile'>Profile</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar;
