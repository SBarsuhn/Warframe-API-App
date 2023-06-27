import React from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom'
const Nav = () => {
  let location = useLocation()
  console.log(location)

  return (
    <div className="navbar">
     <ul>
       <li><NavLink className={location.pathname === "/" ? "highlight" : "navbar"} to = '/'>WORLDSTATES</NavLink></li>
       <li><NavLink className={location.pathname === "/items" ? "highlight" : "navbar"} to = '/items'>ITEMS</NavLink></li>
       <li><NavLink className={location.pathname === "/drops" ? "highlight" : "navbar"} to = '/contact'>DROP DATA</NavLink></li>
     </ul>
    </div>
  );
};

export default Nav;