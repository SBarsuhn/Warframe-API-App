import React from "react";
import { useState, useEffect } from "react";
import Nav from "./nav";
import WWS from '../images/WWS.png'
import WWS2 from '../images/WWS2.png'
import WWS3 from '../images/WWS3.png'
function Header() {
    let title = [
        WWS, WWS2, WWS3
    ]
    const [currentImageIndex, setCurrentImageIndex] = useState(Math.floor(Math.random() * title.length))
    const changeImage = () => {
      const randomNumber =  Math.floor(Math.random() * title.length) ;
      setCurrentImageIndex(randomNumber);
    }
    useEffect(() => changeImage(), [])



    return (
        <>
<div className='header'><img className="header-img" title="WARFRAME WORLD STATES" alt="WARFRAME WORLD STATE" src={title[currentImageIndex]}  /></div>
{/* <Nav /> */}
</>
    );
  }
  
  export default Header;
