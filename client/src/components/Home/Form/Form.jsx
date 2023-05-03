import { useState } from 'react';
import styles from './Form.module.css';
import validate from './validation';

export default function Form(props) {

    const [formulario, setFormulario] = useState({
        id: 20000000,
        title: '',
        image: '',
        summary: '',
        healthScore: 0,
        process: '',
        diets: []
    });

    const handleInputChange = (event) => {
        // console.log(event)
        const { name, value, type } = event.target;

        let parsedNum = value
        // if(type === 'number'){
        //     parsedNum = parseInt(parsedNum)
        // }
        setFormulario((prevFormulario) => ({
            ...prevFormulario,
            [name]: parsedNum,
        }));
        // console.log(formulario)
    };

    const handleDietsChange = (event) => {
        const { value, checked } = event.target;
        setFormulario((prevFormulario) => {
            console.log(value, checked)

            let newDiets = [...prevFormulario.diets];
            if (checked) {
                newDiets.push(parseInt(value));
            } else {
                newDiets = newDiets.filter((diet) => diet !== parseInt(value));
            }
            console.log(newDiets)

            return {
                ...prevFormulario,
                diets: newDiets,
            };
        });

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.createRecipe(formulario);

        setFormulario({
            id: formulario.id + 1,
            title: '',
            image: '',
            summary: '',
            healthScore: 0,
            process: '',
            diets: [],
        });
        console.log(formulario);
    };

    return (
        <form className={styles.nuevaRecetaFormulario} onSubmit={handleSubmit}>
            <div className={styles.name}>
                <label htmlFor="title">Nombre:</label>
                <input type="text" id="title" name="title" value={formulario.title} onChange={handleInputChange} />
            </div>

            <div className={styles.image}>
                <label htmlFor="image">Imagen:</label>
                <input type="text" id="image" name="image" value={formulario.image} onChange={handleInputChange} />
            </div>

            <div>
                <label htmlFor="summary">Resumen:</label>
                <textarea id="summary" name="summary" value={formulario.summary} onChange={handleInputChange} />
            </div>

            <div className={styles.level}>
                <label htmlFor="healthScore">Health Score:</label>
                <input type="number" id='healthScore' name='healthScore' value={formulario.healthScore} onChange={handleInputChange} />
            </div>

            <div>
                <label htmlFor="process">Proceso:</label>
                <textarea id="process" name="process"  value={formulario.process}  onChange={handleInputChange} />
            </div>

            <div>
                <label>Seleccione las diets:</label>
                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='1'
                        checked={formulario.diets.includes(1)}
                        onChange={handleDietsChange}
                    />
                    gluten free
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='2'
                        checked={formulario.diets.includes(2)}
                        onChange={handleDietsChange}
                    />
                    dairy free
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='3'
                        checked={formulario.diets.includes(3)}
                        onChange={handleDietsChange}
                    />
                    lacto ovo vegetarian
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='4'
                        checked={formulario.diets.includes(4)}
                        onChange={handleDietsChange}
                    />
                    vegan
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='5'
                        checked={formulario.diets.includes(5)}
                        onChange={handleDietsChange}
                    />
                    paleolithic
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='6'
                        checked={formulario.diets.includes(6)}
                        onChange={handleDietsChange}
                    />
                    primal
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='7'
                        checked={formulario.diets.includes(7)}
                        onChange={handleDietsChange}
                    />
                    whole 30
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='8'
                        checked={formulario.diets.includes(8)}
                        onChange={handleDietsChange}
                    />
                    pescatarian
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='9'
                        checked={formulario.diets.includes(9)}
                        onChange={handleDietsChange}
                    />
                    ketogenic
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="diets"
                        value='10'
                        checked={formulario.diets.includes(10)}
                        onChange={handleDietsChange}
                    />
                    fodmap friendly
                </label>
                {/* Agrega más checkboxes según tus necesidades */}
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};