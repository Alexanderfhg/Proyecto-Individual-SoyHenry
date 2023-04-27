import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.css';
import image1 from './img/image1.jpeg';
import image2 from './img/image2.jpeg';

export default function Landing(prop) {

    const navigate = useNavigate();
    const goHome = () => navigate('/home');

    return (
        <div className={styles.contenedor}>
            <div className={styles.cuadroUno}>
                <h1>Cuadro 1</h1>                
            </div>
            <div className={styles.cuadroDos}>
                <img src={image1} alt="Imagen 2" />
            </div>
            <div className={styles.cuadroTres}>
                <img src={image2} alt="Imagen 3"/>
            </div>
            <div className={styles.cuadroCuatro}>
                <button onClick={goHome}>Go!</button>                
            </div>
        </div>
    )
}