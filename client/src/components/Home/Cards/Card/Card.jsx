import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';



export default function Card(props) {
    const navigate = useNavigate();
    const goDetail = () => navigate(`/detail/${props.id}`);
    return (
        <div className={styles.card}>
            <button onClick={() => {goDetail()}}>
                <h3>{props.title}</h3>
                <img className={styles.cardImg} src={props.image} alt="imageFood" />
            </button>
        </div>
    )
}