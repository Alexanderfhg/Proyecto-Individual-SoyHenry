import styles from './Card.module.css';

export default function Card(props) {
    return (
        <div className={styles.card}>
            <button onClick={() => {props.getDetail(props.id, props.image)}}>
                <h3>{props.title}</h3>
                <img className={styles.cardImg} src={props.image} alt="imageFood" />
            </button>
        </div>
    )
}