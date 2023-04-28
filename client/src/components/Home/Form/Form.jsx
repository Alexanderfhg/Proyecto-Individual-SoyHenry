import { useState } from 'react';
import styles from './Form.module.css';
import validate from './validation';

export default function Form(prop) {
    const [formulario, setFormulario] = useState({
        name: '',
        image: '',
        summary: '',
        level: '',
        process: '',
        dietas: [],
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormulario((prevFormulario) => ({
            ...prevFormulario,
            [name]: value,
        }));
    };

    const handleDietasChange = (event) => {
        const { value, checked } = event.target;
        setFormulario((prevFormulario) => {
            if (value === 'todas' && checked) {
                return {
                    ...prevFormulario,
                    dietas: ['todas'],
                };
            }

            let newDietas = [...prevFormulario.dietas];
            if (checked) {
                newDietas.push(value);
            } else {
                newDietas = newDietas.filter((dieta) => dieta !== value);
            }

            return {
                ...prevFormulario,
                dietas: newDietas,
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Aquí puedes enviar los datos del formulario al servidor o realizar cualquier acción necesaria

        // Reiniciar los campos del formulario
        setFormulario({
            name: '',
            image: '',
            summary: '',
            level: '',
            process: '',
            dietas: [],
        });
    };

    return (
        <form className={styles.nuevaRecetaFormulario} onSubmit={handleSubmit}>
            <div className={styles.name}>
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" value={formulario.name} onChange={handleInputChange} required />
            </div>

            <div className={styles.image}>
                <label htmlFor="image">Imagen:</label>
                <input type="text" id="image" name="image" value={formulario.image} onChange={handleInputChange} required />
            </div>

            <div>
                <label htmlFor="summary">Resumen:</label>
                <textarea id="summary" name="summary" value={formulario.summary} onChange={handleInputChange} required />
            </div>

            <div className={styles.level}>
                <label htmlFor="level">Nivel:</label>
                <select id="level" name="level" value={formulario.level} onChange={handleInputChange} required>
                    <option value="">Seleccione un nivel</option>
                    <option value="Fácil">Fácil</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Difícil">Difícil</option>
                </select>
            </div>

            <div>
                <label htmlFor="process">Proceso:</label>
                <textarea id="process" name="process" value={formulario.process} onChange={handleInputChange} required />
            </div>

            <div>
                <label>Seleccione las dietas:</label>
                <label>
                    <input
                        type="checkbox"
                        name="dietas"
                        value="Vegana"
                        checked={formulario.dietas.includes('Vegana')}
                        onChange={handleDietasChange}
                    />
                    Vegana
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="dietas"
                        value="Vegetariana"
                        checked={formulario.dietas.includes('Vegetariana')}
                        onChange={handleDietasChange}
                    />
                    Vegetariana
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="dietas"
                        value="Sin gluten"
                        checked={formulario.dietas.includes('Sin gluten')}
                        onChange={handleDietasChange}
                    />
                    Sin gluten
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="dietas"
                        value="Baja en grasas"
                        checked={formulario.dietas.includes('Baja en grasas')}
                        onChange={handleDietasChange}
                    />
                    Baja en grasas
                </label>
                {/* Agrega más checkboxes según tus necesidades */}
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};