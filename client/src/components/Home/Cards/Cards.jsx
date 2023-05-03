import Card from './Card/Card'
import styles from './Cards.module.css';
import { useState } from 'react';
import Form from '../Form/Form';

export default function Cards(props) {
    const recipes = props.recipes;

    const itemsperPage = 9;
    const totalPages = Math.ceil(recipes.length / itemsperPage);

    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsperPage;
    const endIndex = startIndex + itemsperPage;
    const recipesForPage = recipes.slice(startIndex, endIndex)

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    }

    const previousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    }


    return (
        <div className={styles.container}>
            <div>
                {recipes.length ? (
                    <div>
                        <h2>Filtrar</h2>                      
                        <h2>Ordenar</h2>
                    </div>
                ) : null}
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
                        <button onClick={previousPage} disabled={currentPage === 1}>Previous</button>
                    </div>
                    <div>
                        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
                    </div>
                </div>
            </div>
            <div className={styles.formContainer}>
                <Form createRecipe={props.createRecipe} />
            </div>
        </div>
    )
}