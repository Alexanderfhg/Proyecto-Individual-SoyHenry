import { useReducer, useState } from 'react';
import styles from './Form.module.css';
import validate from './validation';
import { setFormVisible, setFormulario } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Form(props) {
    
    const state = useSelector((st) => st);
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        dispatch(setFormulario({
            ...state.formulario,
            [name]: value
        }))
        setErrors(validate({
            ...state.formulario,
            [name]: value
        }));
    };

    const handleDietsChange = (event) => {
        console.log("errors -> ", errors)
        const { value, checked } = event.target;
        const toDispatch = () => {
            console.log(value, checked)

            let newDiets = [...state.formulario.diets];
            if (checked) {
                newDiets.push(parseInt(value));
            } else {
                newDiets = newDiets.filter((diet) => diet !== parseInt(value));
            }
            console.log(newDiets)

            return {
                ...state.formulario,
                diets: newDiets
            };
        }
        dispatch(setFormulario(toDispatch()));
    };

    const handleSubmit = (event) => {
        if(Object.keys(errors).length === 0){
            event.preventDefault();
            props.createRecipe(state.formulario);
    
            dispatch(setFormulario({
                id: ++state.formulario.id,
                title: '',
                image: '',
                summary: '',
                healthScore: 0,
                process: '',
                diets: [],
            }))
            props.onSearch('');
            dispatch(setFormVisible(false));
        } else {
            event.preventDefault();            
            alert('Please complete all required fields before submitting the form')
        }
    };

    const handleCreateClick = () => {
        if (state.formVisible) {
            dispatch(setFormVisible(false))
            dispatch(setFormulario({
                id: state.formulario.id,
                title: '',
                image: '',
                summary: '',
                healthScore: 0,
                process: '',
                diets: [],
            }))
            
        } else {
            setErrors(validate({}))
            dispatch(setFormVisible(true))
        }
    };


    return (
        <div className={styles.formContainer}>
            <button className={styles.createButton} onClick={handleCreateClick}>
                {!state.formVisible ? 'Create new recipe' : 'X Cancel'}
            </button>
            {state.formVisible ? (
                <form className={styles.nuevaRecetaFormulario} onSubmit={handleSubmit}>
                    <div className={styles.name}>
                        <label htmlFor="title">Name:</label>
                        <input className={styles.input} type="text" id="title" name="title" value={state.formulario.title} onChange={handleInputChange} />
                        <p>{errors.title && errors.title}</p>
                    </div>

                    <div className={styles.image}>
                        <label htmlFor="image">Image:</label>
                        <input className={styles.input} type="text" id="image" name="image" value={state.formulario.image} onChange={handleInputChange} />
                        <p>{errors.image && errors.image}</p>
                    </div>

                    <div>
                        <label htmlFor="summary">Summary:</label>
                        <textarea id="summary" name="summary" value={state.formulario.summary} onChange={handleInputChange} />
                        <p>{errors.summary && errors.summary}</p>
                    </div>

                    <div className={styles.level}>
                        <label htmlFor="healthScore">Health Score:</label>
                        <input className={styles.input} type="number" id='healthScore' name='healthScore' value={state.formulario.healthScore} onChange={handleInputChange} />
                        <p>{errors.healthScore && errors.healthScore}</p>
                    </div>

                    <div>
                        <label htmlFor="process">Process:</label>
                        <textarea id="process" name="process" value={state.formulario.process} onChange={handleInputChange} />
                        <p>{errors.process && errors.process}</p>
                    </div>

                    <div>
                        <label>Select diets:</label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='1'
                                checked={state.formulario.diets.includes(1)}
                                onChange={handleDietsChange}
                                className={styles.input}
                            />
                            Gluten free
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='2'
                                checked={state.formulario.diets.includes(2)}
                                onChange={handleDietsChange}
                                className={styles.input}
                            />
                            Dairy free
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='3'
                                checked={state.formulario.diets.includes(3)}
                                onChange={handleDietsChange}
                                className={styles.input}
                            />
                            Lacto ovo vegetarian
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='4'
                                checked={state.formulario.diets.includes(4)}
                                onChange={handleDietsChange}
                                className={styles.input}
                            />
                            Vegan
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='5'
                                checked={state.formulario.diets.includes(5)}
                                onChange={handleDietsChange}
                                className={styles.input}
                            />
                            Paleolithic
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='6'
                                checked={state.formulario.diets.includes(6)}
                                onChange={handleDietsChange}
                                className={styles.input}
                            />
                            Primal
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value='7'
                                checked={state.formulario.diets.includes(7)}
                                onChange={handleDietsChange}
                                className={styles.input}
                            />
                            Whole 30
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='8'
                                checked={state.formulario.diets.includes(8)}
                                onChange={handleDietsChange}
                                className={styles.input}
                            />
                            Pescatarian
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='9'
                                checked={state.formulario.diets.includes(9)}
                                onChange={handleDietsChange}
                                className={styles.input}
                            />
                            Ketogenic
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='10'
                                checked={state.formulario.diets.includes(10)}
                                onChange={handleDietsChange}
                                className={styles.input}
                            />
                            Fodmap friendly
                        </label>
                    </div>
                    <button /* disabled={Object.keys(errors).length !== 0} */ className={styles.buttonSend} type="submit">Send</button>
                </form>
            ) : null}
        </div>
    );
};