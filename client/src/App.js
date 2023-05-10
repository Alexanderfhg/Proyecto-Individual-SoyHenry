import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Nav from './components/Home/NavBar/NavBar';
import axios from 'axios';
import Cards from './components/Home/Cards/Cards'
import Detail from './components/Home/Detail/Detail';
import { useState, useEffect, useReducer } from 'react';
import reducer, { initialState } from './redux/reducer';
import { setRecipes, setRecipesFilter, setCurrentPage, setNotFound, setFilterState } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const dispatch = useDispatch();
  const state = useSelector((st) => st);



  useEffect(() => {
    filterOrder(state.filterState);
  }, [state.filterState])

  const location = useLocation();
  const navigate = useNavigate();

  async function onSearch(title) {

    // dispatch(setRecipesFilter([]))
    // dispatch(setRecipes([]))

    navigate('/home');
    try {
      // dispatch(setRecipes(title))
      const apiRecipes = await axios.get(`http://localhost:3001/recipes?name=${title}`);
      if (apiRecipes.data.length) {
        // console.log('onSearch', apiRecipes.data)

        dispatch(setRecipes(apiRecipes.data))
        dispatch(setRecipesFilter(apiRecipes.data))

        dispatch(setCurrentPage(1))
        dispatch(setFilterState({
          diets: [],
          order: '',
          origin: 'all'
        }))

      } else {
        // console.log(state)
        filterOrder(state.filterState)
        window.alert("No se encontraron recetas con ese nombre")
      }
    } catch (error) {
      console.log(error)
      throw Error(error);
    }
  }

  async function filterOrder(filter) {
    // console.log('dietas del fasdkjfña',state.recipes)
    // console.log("filter -> " , filter)
    // console.log(filter)
    // dispatch(setNotFound(false))
    if (filter) {
      const { diets, order, origin } = filter;
      const allRecipesCopy = [...state.recipes];
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
      if (origin === 'database') {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.id > 2000000);
      }
      if (origin === 'api') {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.id < 2000000);
      }
      dispatch(setRecipesFilter(filteredRecipes))
    }
  }



  async function createRecipe(newRecipe) {
    try {
      await axios.get('http://localhost:3001/diets');
      try {

        await axios.post(`http://localhost:3001/recipes`, newRecipe)
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
      <Routes>
        <Route path="/" element={<Landing onSearch={onSearch} />} />
        <Route path='/home' element={<Cards

          createRecipe={createRecipe}

        />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </div>
  );
}


export default App;
