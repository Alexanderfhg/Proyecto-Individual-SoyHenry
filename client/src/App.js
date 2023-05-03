import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Nav from './components/Home/NavBar/NavBar';
import axios from 'axios';
import Cards from './components/Home/Cards/Cards'
import Detail from './components/Home/Detail/Detail';
import Form from './components/Home/Form/Form';


import { useState, useEffect } from 'react';

function App() {

  const [recipes, setRecipes] = useState([])

  const location = useLocation();
  const navigate = useNavigate();

  async function onSearch(name) {
    setRecipes([])
    navigate('/home');
    try {
      const apiRecipes = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      if (apiRecipes.data.length !== 0) {
        setRecipes(apiRecipes.data);
      } else {
        window.alert("No se encontraron recetas con ese nombre")
      }
    } catch (error) {
      throw Error(error);
    }
    // console.log(apiRecipes)
  }


  async function createRecipe(newRecipe) {
    try {
      const getDiets = await axios.get('http://localhost:3001/diets');
      // console.log("Dietas creadas -> ", getDiets.data)
      try {
        // console.log(newRecipe);
        const recipe = await axios.post(`http://localhost:3001/recipes`, newRecipe)
        // console.log("nueva receta -> ", recipe.data)
      } catch (recipeError) {
        throw Error(recipeError)
      }
    } catch (dietsError) {
      throw Error(dietsError);
    }
  }

  return (
    <div className="App">
      {location.pathname !== '/' && <Nav onSearch={onSearch} />}
      {/* {location.pathname === '/home' && <Form/>} */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/home' element={ <Cards createRecipe={createRecipe} recipes={recipes} />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </div>
  );
}


export default App;
