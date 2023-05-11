import { useEffect, useState } from 'react';
import styles from './Filter.module.css';
import { setCurrentPage, setFilterState } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
export default function Filter() {

    const dispatch = useDispatch();
    const state = useSelector((st) => st);

    const [clearButton, setClearButton] = useState(false)
    useEffect( ()=> {
        if(state.selectDiets || state.applyFilter || state.applyOrder){
            setClearButton(true);
        } else {
            setClearButton(false);
        }
    })

    const handleFilterChange = (event) => {
        const { name, value, checked } = event.target;
        if (name === 'diets') {
            const toDispatch = () => {
                let newDiets = [...state.filterState.diets];
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

            dispatch(setFilterState({ ...state.filterState, [name]: value }))
            
        }
        
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
                        Gluten free
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            name="diets"
                            value='2'
                            checked={state.filterState.diets.includes(2)}
                            onChange={handleFilterChange}
                        />
                        Dairy free
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="diets"
                            value='3'
                            checked={state.filterState.diets.includes(3)}
                            onChange={handleFilterChange}
                        />
                        Lacto ovo vegetarian
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="diets"
                            value='4'
                            checked={state.filterState.diets.includes(4)}
                            onChange={handleFilterChange}
                        />
                        Vegan
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="diets"
                            value='5'
                            checked={state.filterState.diets.includes(5)}
                            onChange={handleFilterChange}
                        />
                        Paleolithic
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="diets"
                            value='6'
                            checked={state.filterState.diets.includes(6)}
                            onChange={handleFilterChange}
                        />
                        Primal
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="diets"
                            value='7'
                            checked={state.filterState.diets.includes(7)}
                            onChange={handleFilterChange}
                        />
                        Whole 30
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="diets"
                            value='8'
                            checked={state.filterState.diets.includes(8)}
                            onChange={handleFilterChange}
                        />
                        Pescatarian
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="diets"
                            value='9'
                            checked={state.filterState.diets.includes(9)}
                            onChange={handleFilterChange}
                        />
                        Ketogenic
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="diets"
                            value='10'
                            checked={state.filterState.diets.includes(10)}
                            onChange={handleFilterChange}
                        />
                        Fodmap friendly
                    </label>
                </div>
            ) : null}
            {state.applyFilter ? (
                <div className={styles.checkboxContainer}>                    
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
                    <label>
                        <input
                            type="radio"
                            name="order"
                            value="nameAsc"
                            checked={state.filterState.order === "nameAsc"}
                            onChange={handleFilterChange}
                        />
                        Name (A - Z)
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="order"
                            value="nameDesc"
                            checked={state.filterState.order === "nameDesc"}
                            onChange={handleFilterChange}
                        />
                        Name (Z - A)
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="order"
                            value="healthScore"
                            checked={state.filterState.order === "healthScore"}
                            onChange={handleFilterChange}
                        />
                        Healt Score
                    </label>

                </div>
            ) : null}
            {clearButton && (
                <button className={styles.buttonClear} onClick={() => {
                    dispatch(setFilterState({ diets: [], order: '', origin: 'all' }))
                    dispatch(setCurrentPage(1))
                }}>Clear all</button>
            )}
        </div>
    )
}