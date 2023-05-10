import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';



export default function Card(props) {
    const navigate = useNavigate();
    const goDetail = () => navigate(`/detail/${props.id}`);
    return (
        <div className={styles.card}>
            <button className={styles.buttonCard} onClick={() => { goDetail() }}>
                <h3 className={styles.cardTitle}>{props.title}</h3>
                <div className={styles.cardImgOverlay}>
                    <img className={styles.cardImg} src={props.image} alt="imageFood" />
                    <div className={styles.overlay}>
                        <div className={styles.diets}>
                            <ul>
                                {props.diets.map((diet, index) => (
                                    <li key={index}>{diet}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );
}