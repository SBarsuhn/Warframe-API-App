
import './MobileApp.css'
import Header from './pages/header'
import HomeMobile from './pages/homeMobile';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function MobileApp() {

  return (
    <BrowserRouter>
    <Header></Header>
    <Routes>
    <Route path = '/' element = {<HomeMobile />} />
    </Routes>
    </BrowserRouter>
  );
}

export default MobileApp;