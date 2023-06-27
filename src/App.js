import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import Header from './pages/header'
import Items from './pages/items';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {

  return (
    <BrowserRouter>
    <Header></Header>
    <Routes>
    <Route path = '/' element = {<Home />} />
    <Route path = '/items' element = {<Items />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
