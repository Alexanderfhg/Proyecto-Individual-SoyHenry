import { SET_APPLY_FILTER, SET_APPLY_ORDER, SET_CURRENT_PAGE, SET_FILTER_STATE, SET_FORMULARIO, SET_FORM_VISIBLE, SET_NOT_FOUND, SET_RECIPES, SET_RECIPES_FILTER, SET_SELECT_DIETS } from "./actions";

const storedPage = localStorage.getItem('currentPage');
const initialPage = storedPage ? parseInt(storedPage) : 1;

export const initialState = {
    recipes: [],
    recipesFilter: [],
    currentPage: initialPage,
    selectDiets: false,
    applyFilter: false,
    applyOrder: false,
    formVisible: false,
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
        case SET_SELECT_DIETS:
            return {
                ...state,
                selectDiets: action.payload
            }
        case SET_APPLY_FILTER:
            return {
                ...state,
                applyFilter: action.payload
            }
        case SET_APPLY_ORDER:
            return {
                ...state,
                applyOrder: action.payload
            }
        case SET_FORM_VISIBLE:
            return {
                ...state,
                formVisible: action.payload
            }
        default:
            return state;
    }
}

export default reducer;
