// import axios from "axios";
export const SET_RECIPES = 'SET_RECIPES';
export const SET_RECIPES_FILTER = 'SET_RECIPES_FILTER';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_FILTER_STATE = 'SET_FILTER_STATE';
export const SET_FORMULARIO = 'SET_FORMULARIO';
export const SET_NOT_FOUND = 'SET_NOT_FOUND';
export const SET_SELECT_DIETS = 'SET_SELECT_DIETS';
export const SET_APPLY_FILTER = 'SET_APPLY_FILTER';
export const SET_APPLY_ORDER = 'SET_APPLY_ORDER';
export const SET_FORM_VISIBLE = 'SET_FORM_VISIBLE';

export const setRecipes = (payload) => {
    return { type: SET_RECIPES, payload: payload }
}
export const setRecipesFilter = (payload) => {
    return { type: SET_RECIPES_FILTER, payload: payload }
}
export const setCurrentPage = (payload) => {
    return { type: SET_CURRENT_PAGE, payload: payload }
}
export const setFilterState = (payload) => {
    return { type: SET_FILTER_STATE, payload: payload }
}
export const setFormulario = (payload) => {
    return { type: SET_FORMULARIO, payload: payload }
}
export const setNotFound = (payload) => {
    return { type: SET_NOT_FOUND, payload: payload }
}
export const setSelectDiets = (payload) => {
    return { type: SET_SELECT_DIETS, payload: payload }
}
export const setApplyFilter = (payload) => {
    return { type: SET_APPLY_FILTER, payload: payload }
}
export const setApllyOrder = (payload) => {
    return { type: SET_APPLY_ORDER, payload: payload }
}
export const setFormVisible = (payload) => {
    return { type: SET_FORM_VISIBLE, payload: payload }
}