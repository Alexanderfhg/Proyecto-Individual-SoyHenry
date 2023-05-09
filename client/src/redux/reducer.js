import { SET_CURRENT_PAGE, SET_FILTER_STATE, SET_FORMULARIO, SET_NOT_FOUND, SET_RECIPES, SET_RECIPES_FILTER } from "./actions";

const storedPage = localStorage.getItem('currentPage');
const initialPage = storedPage ? parseInt(storedPage) : 1;

export const initialState = {
    recipes: [],
    contador: 0,
    recipesFilter: [],
    currentPage: initialPage,
    notFound: false,
    formulario: {
        id: 2000000,
        title: '',
        image: '',
        summary: '',
        healthScore: 0,
        process: '',
        diets: []
    },
    filterState: {
        diets: [],
        order: '',
        origin: 'all'
    }
}

const reducer = (state = initialState, action) => {
    // console.log('state-> ', state)
    switch (action.type) {
        case SET_RECIPES:
            // console.log('reducer -> ', action.payload);
            return {
                ...state,
                recipes: action.payload
            }
        case SET_RECIPES_FILTER:
            return {
                ...state,
                recipesFilter: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_FILTER_STATE:
            return {
                ...state,
                filterState: action.payload
            }
        case SET_FORMULARIO:
            return {
                ...state,
                formulario: action.payload
            }
        case SET_NOT_FOUND:
            return {
                ...state,
                notFound: action.payload
            }
        default:
            return state;
    }
}

export default reducer;
