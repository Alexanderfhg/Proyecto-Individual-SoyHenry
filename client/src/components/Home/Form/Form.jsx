import { useReducer, useState } from 'react';
import styles from './Form.module.css';
import validate from './validation';
import reducer, { initialState } from '../../../redux/reducer';
import { setFormulario } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Form(props) {
    // const [state, dispatch] = useReducer(reducer, initialState)
    const state = useSelector((st) => st);
    const dispatch = useDispatch();

    // const { formulario, setFormulario } = props;
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        // console.log(event)
        const { name, value } = event.target;

        dispatch(setFormulario({
            ...state.formulario,
            [name]: value
        }))
        setErrors(validate({
            ...state.formulario,
            [name]: value
        }));
        // console.log(formulario)
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
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (event) => {
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
        setShowForm(false)
    };

    const handleCreateClick = () => {
        setShowForm(true);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit();
        setShowForm(false);
    };

    return (
        <div className={styles.formContainer}>
            <button className={styles.createButton} onClick={handleCreateClick}>
                Crear nueva receta
            </button>
            {showForm ? (
                <form className={styles.nuevaRecetaFormulario} onSubmit={handleSubmit}>
                    <div className={styles.name}>
                        <label htmlFor="title">Nombre:</label>
                        <input type="text" id="title" name="title" value={state.formulario.title} onChange={handleInputChange} />
                        <span>{errors.title && errors.title}</span>
                    </div>

                    <div className={styles.image}>
                        <label htmlFor="image">Imagen:</label>
                        <input type="text" id="image" name="image" value={state.formulario.image} onChange={handleInputChange} />
                    </div>

                    <div>
                        <label htmlFor="summary">Resumen:</label>
                        <textarea id="summary" name="summary" value={state.formulario.summary} onChange={handleInputChange} />
                        <p>{errors.summary && errors.summary}</p>
                    </div>

                    <div className={styles.level}>
                        <label htmlFor="healthScore">Health Score:</label>
                        <input type="number" id='healthScore' name='healthScore' value={state.formulario.healthScore} onChange={handleInputChange} />
                        <p>{errors.healthScore && errors.healthScore}</p>
                    </div>

                    <div>
                        <label htmlFor="process">Proceso:</label>
                        <textarea id="process" name="process" value={state.formulario.process} onChange={handleInputChange} />
                        <p>{errors.process && errors.process}</p>
                    </div>

                    <div>
                        <label>Seleccione las dietas:</label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='1'
                                checked={state.formulario.diets.includes(1)}
                                onChange={handleDietsChange}
                            />
                            gluten free
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='2'
                                checked={state.formulario.diets.includes(2)}
                                onChange={handleDietsChange}
                            />
                            dairy free
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='3'
                                checked={state.formulario.diets.includes(3)}
                                onChange={handleDietsChange}
                            />
                            Vegetarian
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='4'
                                checked={state.formulario.diets.includes(4)}
                                onChange={handleDietsChange}
                            />
                            vegan
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='5'
                                checked={state.formulario.diets.includes(5)}
                                onChange={handleDietsChange}
                            />
                            paleolithic
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='6'
                                checked={state.formulario.diets.includes(6)}
                                onChange={handleDietsChange}
                            />
                            primal
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value='7'
                            checked={state.formulario.diets.includes(7)}
                            onChange={handleDietsChange}
                    />
                            whole 30
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='8'
                                checked={state.formulario.diets.includes(8)}
                                onChange={handleDietsChange}
                            />
                            pescatarian
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='9'
                                checked={state.formulario.diets.includes(9)}
                                onChange={handleDietsChange}
                            />
                            ketogenic
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="diets"
                                value='10'
                                checked={state.formulario.diets.includes(10)}
                                onChange={handleDietsChange}
                            />
                            fodmap friendly
                        </label>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            ) : null}
        </div>
    );
};