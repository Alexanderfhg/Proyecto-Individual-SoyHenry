import Card from './Card/Card'
import Form from '../Form/Form';
import Filter from '../Filter/Filter';
import styles from './Cards.module.css';
import { useState, useEffect, useReducer } from 'react';
import reducer, { initialState } from '../../../redux/reducer';
import { setCurrentPage } from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux'

export default function Cards(props) {
    // const [dispatch] = useReducer(reducer, initialState);
    const dispatch = useDispatch();
    const state = useSelector((st) => st)

    // const { recipes, currentPage, setCurrentPage } = props;
    // console.log('estadoooo', state);
    const totalPages = Math.ceil(state.recipesFilter.length / 8);

    const startIndex = (state.currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    const recipesForPage = state.recipesFilter.slice(startIndex, endIndex)
    const prev = '<', next = '>';

    const nextPage = () => {
        const nextPage = state.currentPage + 1;
        dispatch(setCurrentPage(nextPage));
    }

    const previousPage = () => {
        const prevPage = state.currentPage - 1;
        dispatch(setCurrentPage(prevPage));
    }

    const selectPage = (page) => {
        dispatch(setCurrentPage(page));
    }


    useEffect(() => {
        localStorage.setItem('currentPage', state.currentPage);
    }, [state.currentPage]);

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
                <Filter                
                />
            </div>
            {state.recipesFilter.length ? (
                <div className={styles.cardsContainer}>
                    <div className={styles.cards}>
                        {recipesForPage.map(recipe => (
                            <Card
                                id={recipe.id}
                                key={recipe.id}
                                getDetail={props.getDetail}
                                title={recipe.title}
                                image={recipe.image}
                                diets={recipe.diets}
                            />
                        ))}
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.buttonPag}>
                            <button onClick={previousPage} disabled={state.currentPage === 1}>{prev}</button>
                        </div>
                        <div className={styles.buttonPag}>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => selectPage(index + 1)}
                                    disabled={state.currentPage === index + 1}
                                    className={state.currentPage === index + 1 ? styles.selectedPage : ''}
                                >{index + 1}
                                </button>
                            ))}
                        </div>
                        <div className={styles.buttonPag}>
                            <button
                                onClick={nextPage}
                                disabled={state.currentPage === totalPages || state.recipes.length === 0}>{next}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.loadingContainer}>
                    <span className={styles.loader}></span>
                </div>
            )}
            <div className={styles.formContainer}>
                <Form
                    createRecipe={props.createRecipe}               
                />
            </div>
        </div>
    )
}
