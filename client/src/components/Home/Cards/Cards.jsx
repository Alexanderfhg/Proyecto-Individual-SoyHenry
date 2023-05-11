import Card from './Card/Card'
import Form from '../Form/Form';
import Filter from '../Filter/Filter';
import styles from './Cards.module.css';
import { useState, useEffect, useReducer } from 'react';
import { setCurrentPage } from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

export default function Cards(props) {
    
    const dispatch = useDispatch();
    const state = useSelector((st) => st)

    const [dispelDiv, setDispelDiv] = useState(false)
    useEffect(() => {
        if (state.selectDiets || state.applyFilter || state.applyOrder) {
            setDispelDiv(true);
        } else {
            setDispelDiv(false);
        }
    })
    
    const totalPages = Math.ceil(state.recipesFilter.length / 9);

    const startIndex = (state.currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    const recipesForPage = state.recipesFilter.slice(startIndex, endIndex)

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

    return (

        <div className={styles.container}>
            <div>
                <Filter
                />
            </div>
            {state.recipesFilter.length ? (
                <div className={`${styles.cardsContainer} ${dispelDiv ? styles.dispel : ''} ${state.formVisible ? styles.dispel : ''}`}>
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
                            <button onClick={() => dispatch(setCurrentPage(1))} disabled={state.currentPage === 1}>
                                <FontAwesomeIcon icon={faAngleDoubleLeft} />
                            </button>
                            <button onClick={previousPage} disabled={state.currentPage === 1}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
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
                                disabled={state.currentPage === totalPages || state.recipes.length === 0}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                            <button
                                onClick={() => dispatch(setCurrentPage(totalPages))}
                                disabled={state.currentPage === totalPages || state.recipes.length === 0}>
                                <FontAwesomeIcon icon={faAngleDoubleRight} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.loadingContainer}>
                    <span className={styles.loader}></span>
                </div>
            )}
            <div className={`${styles.formContainer} ${dispelDiv ? styles.dispel : ''}`}>
                <Form
                    createRecipe={props.createRecipe}
                    onSearch={props.onSearch}
                />
            </div>
        </div>
    )
}
