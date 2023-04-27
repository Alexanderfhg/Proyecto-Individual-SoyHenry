import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Nav from './components/Home/NavBar/NavBar';
import axios from 'axios';
import Cards from './components/Home/Cards/Cards'


import { useState, useEffect } from 'react';

function App() {

  const [recipes, setRecipes] = useState([])

  const location = useLocation();

  async function onSearch(name) {
    const apiRecipes = await axios.get(`http://localhost:3001/recipes?name=${name}`);
    setRecipes(apiRecipes.data);
  }
  

  return (
    <div className="App">
      {location.pathname !== '/' && <Nav onSearch={onSearch} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/home' element={<Cards recipes={recipes}/>} />
      </Routes>
    </div>
  );
}

export default App;
