import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Nav from './components/Home/NavBar/NavBar';
import axios, { all } from 'axios';
import Cards from './components/Home/Cards/Cards'
import Detail from './components/Home/Detail/Detail';
import Form from './components/Home/Form/Form';


import { useState, useEffect } from 'react';

function App() {

  const [recipes, setRecipes] = useState([])
  const [recipesFilter, setRecipesFilter] = useState([]);
  const [filterState, setFilterState] = useState({
    diets: [],
    order: '',
    origin: 'all'
  });
  useEffect(() => {
    filterOrder(filterState);
  }, [filterState])

  const location = useLocation();
  const navigate = useNavigate();
  // var allRecipes = [];

  async function onSearch(name) {
    setRecipes([])
    navigate('/home');
    try {
      const apiRecipes = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      if (apiRecipes.data.length !== 0) {
        setRecipes(apiRecipes.data);
        setRecipesFilter(apiRecipes.data)
        // allRecipes = apiRecipes.data;
        // console.log(allRecipes)
      } else {
        window.alert("No se encontraron recetas con ese nombre")
      }
    } catch (error) {
      throw Error(error);
    }
  }

  async function filterOrder(filter) {
    console.log(filter)
    if (filter) {
      const { diets, order, origin } = filter;
      const allRecipesCopy = [...recipes];
      let filteredRecipes = allRecipesCopy;

      if (diets.includes(1)) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.diets.includes('lacto ovo vegetarian'));
      }
      if (diets.includes(2)) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.diets.includes('vegan'));
      }
      if (diets.includes(3)) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.diets.includes('gluten free'));
      }

      // Realizar el ordenamiento basado en la opción seleccionada
      switch (order) {
        case 'nameAsc':
          filteredRecipes.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'nameDesc':
          filteredRecipes.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'healthScore':
          filteredRecipes.sort((a, b) => b.healthScore - a.healthScore);
          break;
        default:
          break;
      }

      // Realizar el filtrado basado en el origen seleccionado
      if (origin === 'database') {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.id > 2000000);
      }
      if (origin === 'api') {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.id < 2000000);
      }

      // // Actualizar el estado 'recipes' con las recetas filtradas y ordenadas
      // console.log(recipes)
      setRecipesFilter(filteredRecipes);
    }
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
        <Route path='/home' element={<Cards filterOrder={filterOrder} filterState={filterState} setFilterState={setFilterState} createRecipe={createRecipe} recipes={recipesFilter} />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </div>
  );
}


export default App;
