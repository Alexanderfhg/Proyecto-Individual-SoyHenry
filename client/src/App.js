import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Nav from './components/Home/NavBar/NavBar';
import axios from 'axios';
import Cards from './components/Home/Cards/Cards'
import Detail from './components/Home/Detail/Detail';
import { useEffect } from 'react';
import { setRecipes, setRecipesFilter, setCurrentPage, setFilterState } from './redux/actions';
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

    dispatch(setRecipesFilter([]))

    navigate('/home');
    try {
      
      const apiRecipes = await axios.get(`http://localhost:3001/recipes?name=${title}`);
      if (apiRecipes.data.length) {        

        dispatch(setRecipes(apiRecipes.data))
        dispatch(setRecipesFilter(apiRecipes.data))

        dispatch(setCurrentPage(1))
        dispatch(setFilterState({
          diets: [],
          order: '',
          origin: 'all'
        }))

      } else {
        filterOrder(state.filterState)
        window.alert("No se encontraron recetas con ese nombre")
      }
    } catch (error) {
      console.log(error)
      throw Error(error);
    }
  }

  async function filterOrder(filter) {
   
    if (filter) {
      const { diets, order, origin } = filter;
      const allRecipesCopy = [...state.recipes];
      let filteredRecipes = allRecipesCopy;

      if (diets.includes(1)) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.diets.includes('gluten free'));
      }
      if (diets.includes(2)) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.diets.includes('dairy free'));
      }
      if (diets.includes(3)) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.diets.includes('lacto ovo vegetarian'));
      }
      if (diets.includes(4)) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.diets.includes('vegan'));
      }
      if (diets.includes(5)) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.diets.includes('paleolithic'));
      }
      if (diets.includes(6)) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.diets.includes('primal'));
      }
      if (diets.includes(7)) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.diets.includes('whole 30'));
      }
      if (diets.includes(8)) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.diets.includes('pescatarian'));
      }
      if (diets.includes(9)) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.diets.includes('ketogenic'));
      }
      if (diets.includes(10)) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.diets.includes('fodmap friendly'));
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
          onSearch={onSearch}
        />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </div>
  );
}


export default App;
