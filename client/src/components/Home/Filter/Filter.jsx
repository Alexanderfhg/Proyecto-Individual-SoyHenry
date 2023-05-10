import { useReducer, useState } from 'react';
import styles from './Filter.module.css';
import reducer, { initialState } from '../../../redux/reducer';
import { setCurrentPage, setFilterState } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
export default function Filter(props) {

    // const [state, dispatch] = useReducer(reducer, initialState);
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    // const { filterState, setFilterState, setCurrentPage } = props;

    const handleFilterChange = (event) => {
        // console.log("cambiando filtro")
        const { name, value, checked } = event.target;
        // console.log(name, value, checked)
        if (name === 'diets') {
            const toDispatch = () => {
                let newDiets = [...state.filterState.diets];
                //   console.log(newDiets)
                if (checked) {
                    newDiets.push(parseInt(value));
                } else {
                    newDiets = newDiets.filter((diet) => diet !== parseInt(value));
                }
                return {
                    ...state.filterState,
                    diets: newDiets
                }
            }
            dispatch(setFilterState(toDispatch()));
        } else {
            
            dispatch(setFilterState({...state.filterState, [name]: value}))
            // dispatch(setFilterState((prevFilter) => ({
            //     ...prevFilter,
            //     [name]: value
            // })))
        }
        // console.log(currentPage) 
        dispatch(setCurrentPage(1))
    }

    
    return (
        <div className={styles.filterContainer}>
            {state.selectDiets ? (
            <div className={styles.checkboxContainer}>
                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='1'
                        checked={state.filterState.diets.includes(1)}
                        onChange={handleFilterChange}
                    />
                    Vegetarian
                </label>

                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='2'
                        checked={state.filterState.diets.includes(2)}
                        onChange={handleFilterChange}
                    />
                    Vegan
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='3'
                        checked={state.filterState.diets.includes(3)}
                        onChange={handleFilterChange}
                    />
                    Gluten Free
                </label>
            </div>
            ): null}
            {state.applyFilter ? (
            <div className={styles.checkboxContainer}>
                {/* <label>Filtrar por origen:</label> */}
                <label>
                    <input
                        type="radio"
                        name="origin"
                        value="api"
                        checked={state.filterState.origin === "api"}
                        onChange={handleFilterChange}
                    />
                    New recipes
                </label>
                <label>
                    <input
                        type="radio"
                        name="origin"
                        value="database"
                        checked={state.filterState.origin === "database"}
                        onChange={handleFilterChange}
                    />
                    My recipes
                </label>
                <label>
                    <input
                        type="radio"
                        name="origin"
                        value="all"
                        checked={state.filterState.origin === "all"}
                        onChange={handleFilterChange}
                    />
                    All recipes
                </label>
            </div>
            ) : null}
            {state.applyOrder ? (
            <div className={styles.checkboxContainer}>
                {/* <label>Ordenar por:</label> */}
                <label>
                    <input
                        type="radio"
                        name="order"
                        value="nameAsc"
                        checked={state.filterState.order === "nameAsc"}
                        onChange={handleFilterChange}
                    />
                    Nombre (Ascendente)
                </label>
                <label>
                    <input
                        type="radio"
                        name="order"
                        value="nameDesc"
                        checked={state.filterState.order === "nameDesc"}
                        onChange={handleFilterChange}
                    />
                    Nombre (Descendente)
                </label>
                <label>
                    <input
                        type="radio"
                        name="order"
                        value="healthScore"
                        checked={state.filterState.order === "healthScore"}
                        onChange={handleFilterChange}
                    />
                    Comida saludable
                </label>
                <button className={styles.buttonClear} onClick={() => {
                    dispatch(setFilterState({ diets: [], order: '', origin: 'all' }))
                    dispatch(setCurrentPage(1))
                }}>Limpiar</button>
            </div>
            ) : null}
        </div>
    )
}