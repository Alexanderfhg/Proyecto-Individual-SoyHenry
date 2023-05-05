import Card from './Card/Card'
import styles from './Cards.module.css';
import { useState, useEffect, useRef } from 'react';
import Form from '../Form/Form';

export default function Cards(props) {

    // filter sort
    // console.log("Render")
    
    
    // cards
    const recipes = props.recipes;

    const itemsPerPage = 9;
    const totalPages = Math.ceil(recipes.length / itemsPerPage);

    const storedPage = localStorage.getItem('currentPage');
    const initialPage = storedPage ? parseInt(storedPage) : 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [selectedPage, setSelectedPage] = useState(currentPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const recipesForPage = recipes.slice(startIndex, endIndex)

    const prev = '<', next = '>';

    const nextPage = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        setSelectedPage(nextPage);
    }

    const previousPage = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        setSelectedPage(prevPage);
    }
    
    const selectPage = (page) => {
        setCurrentPage(page);
        setSelectedPage(page);
    }
    const {filterState, setFilterState} = props;
    const handleFilterChange = (event) => {
        console.log("cambiando filtro")
        const { name, value, checked } = event.target;
        // console.log(name, value, checked)
        if (name === 'diets') {
            setFilterState((prevFilter) => {
                let newDiets = [...prevFilter.diets];
                //   console.log(newDiets)
                if (checked) {
                    newDiets.push(parseInt(value));
                } else {
                    newDiets = newDiets.filter((diet) => diet !== parseInt(value));
                }                
                return {
                    ...prevFilter,
                    diets: newDiets
                }
            })
        } else {
            setFilterState((prevFilter) => ({
                ...prevFilter,
                [name]: value
            }))            
        }
        // console.log(currentPage) 
        setCurrentPage(1);
    }
 
    useEffect(() => {
        localStorage.setItem('currentPage', currentPage);
    }, [currentPage]);

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.checkboxContainer}>
                    <label>Seleccione las dietas:</label>
                    <label>
                        <input
                            type="checkbox"
                            name="diets"
                            value='1'
                            checked={filterState.diets.includes(1)}
                            onChange={handleFilterChange}                            
                        />
                        Vegetarian
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="diets"
                            value='2'
                            checked={filterState.diets.includes(2)}
                            onChange={handleFilterChange}
                        />
                        Vegan
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="diets"
                            value='3'
                            checked={filterState.diets.includes(3)}
                            onChange={handleFilterChange}
                        />
                        Gluten Free
                    </label>
                </div>
                <div className={styles.checkboxContainer}>
                    <label>Filtrar por origen:</label>
                    <label>
                        <input
                            type="radio"
                            name="origin"
                            value="api"
                            checked={filterState.origin === "api"}
                            onChange={handleFilterChange}
                        />
                        New recipes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="origin"
                            value="database"
                            checked={filterState.origin === "database"}
                            onChange={handleFilterChange}
                        />
                        My recipes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="origin"
                            value="all"
                            checked={filterState.origin === "all"}
                            onChange={handleFilterChange}
                        />
                        All recipes
                    </label>
                </div>
                <div className={styles.checkboxContainer}>
                    <label>Ordenar por:</label>
                    <label>
                        <input
                            type="radio"
                            name="order"
                            value="nameAsc"
                            checked={filterState.order === "nameAsc"}
                            onChange={handleFilterChange}
                        />
                        Nombre (Ascendente)
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="order"
                            value="nameDesc"
                            checked={filterState.order === "nameDesc"}
                            onChange={handleFilterChange}
                        />
                        Nombre (Descendente)
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="order"
                            value="healthScore"
                            checked={filterState.order === "healthScore"}
                            onChange={handleFilterChange}
                        />
                        Comida saludable
                    </label>
                </div>
            </div>
            <div className={styles.cardsContainer}>
                <div className={styles.cards}>
                    {recipesForPage.map(recipe => (
                        <Card
                            id={recipe.id}
                            key={recipe.id}
                            getDetail={props.getDetail}
                            title={recipe.title}
                            image={recipe.image}
                            diets={recipe.diets} />
                    ))}
                </div>
                <div className={styles.buttonContainer}>
                    <div>
                        <button onClick={previousPage} disabled={currentPage === 1}>{prev}</button>
                    </div>
                    <div>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => selectPage(index + 1)}
                                disabled={currentPage === index + 1}
                                className={selectedPage === index + 1 ? styles.selectedPage : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <div>
                        <button onClick={nextPage} disabled={currentPage === totalPages || recipes.length === 0}>{next}</button>
                    </div>
                </div>
            </div>
            <div className={styles.formContainer}>
                <Form createRecipe={props.createRecipe} />
            </div>
        </div>
    )
}
