import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Nav from './components/Home/NavBar/NavBar';
import axios from 'axios';
import Cards from './components/Home/Cards/Cards'
import Detail from './components/Home/Detail/Detail';


import { useState, useEffect } from 'react';

function App() {

  const [recipes, setRecipes] = useState([])
  const [detail, setDetail] = useState({})

  const location = useLocation();
  const navigate = useNavigate();

  async function onSearch(name) {
    setRecipes([])
    navigate('/home');
    const apiRecipes = await axios.get(`http://localhost:3001/recipes?name=${name}`);
    // console.log(apiRecipes)
    setRecipes(apiRecipes.data);
  }

  async function getDetail(id, img) {
    navigate(`/detail/${id}`)
    const apiDetail = await axios.get(`http://localhost:3001/recipes/${id}`)
    apiDetail.data.image = img;
    setDetail(apiDetail.data)
  }

  async function createRecipe (newRecipe) {
    try {
      const getDiets = await axios.get('http://localhost:3001/diets');
      console.log("Dietas creadas -> ", getDiets.data)
      try {
        console.log(newRecipe);
        const recipe = await axios.post(`http://localhost:3001/recipes`, newRecipe)
        console.log("nueva receta -> ", recipe.data)        
      } catch (recipeError) {
        throw Error (recipeError)
      }
    } catch (dietsError) {
      throw Error (dietsError);
    }
  }

  return (
    <div className="App">
      {location.pathname !== '/' && <Nav onSearch={onSearch} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/home' element={recipes.length !== 0 && <Cards createRecipe={createRecipe} recipes={recipes} getDetail={getDetail} />} />
        <Route path='/detail/:id' element={<Detail detail={detail} />} />
      </Routes>
    </div>
  );
}


export default App;
