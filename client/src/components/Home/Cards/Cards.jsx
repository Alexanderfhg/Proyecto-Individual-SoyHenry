import Card from './Card/Card'
import Form from '../Form/Form';
import Filter from '../Filter/Filter';
import styles from './Cards.module.css';
import { useState, useEffect } from 'react';

export default function Cards(props) {

    const { recipes, currentPage, setCurrentPage } = props;
    console.log(recipes);
    const totalPages = Math.ceil(recipes.length / 9);

    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    const recipesForPage = recipes.slice(startIndex, endIndex)
    const prev = '<', next = '>';

    const nextPage = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
    }

    const previousPage = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
    }

    const selectPage = (page) => {
        setCurrentPage(page);
    }


    useEffect(() => {
        localStorage.setItem('currentPage', currentPage);
    }, [currentPage]);

    // if(!recipes.length){
    //     return (
    //         <div className={styles.loadingContainer}>
    //             <span className={styles.loader}></span>
    //         </div>
    //     )    
    // }

    return (
        <div className={styles.container}>
            <div>
                <Filter setCurrentPage={setCurrentPage} filterState={props.filterState} setFilterState={props.setFilterState} />
            </div>
            {recipes.length ? (
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
                                    className={currentPage === index + 1 ? styles.selectedPage : ''}
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
            ): (
                <div className={styles.loadingContainer}>
                <span className={styles.loader}></span>
            </div>
            )}
            <div className={styles.formContainer}>
                <Form createRecipe={props.createRecipe} formulario={props.formulario} setFormulario={props.setFormulario} />
            </div>
        </div>
    )
}
