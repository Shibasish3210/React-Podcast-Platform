import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineMenuFold,AiOutlineClose } from "react-icons/ai";
import './style.css'

const Navbar = () => {

  const[isOpen, setIsOpen] = useState(true);

  const handleMenu = () => {
    isOpen ? setIsOpen(false): setIsOpen(true);

  };
  return (
    <nav>
      {
        isOpen &&
        <ul className='navbar'>
        <li><NavLink to='/sign-in-sign-up'>SignUp / SignIn</NavLink></li>
        <li><NavLink to='/podcasts'>Podcasts</NavLink></li>
        <li><NavLink to='/start-a-podcast'>Start A Podcast</NavLink></li>
        <li><NavLink to='/profile'>Profile</NavLink></li>
        </ul>
      }
        <li onClick={handleMenu} className='menu'>{isOpen ? <AiOutlineClose/> : <AiOutlineMenuFold/>}</li>
    </nav>
  )
}

export default Navbar;
