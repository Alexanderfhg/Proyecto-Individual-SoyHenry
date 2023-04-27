import styles from './Card.module.css';

export default function Card (props) {
    return(
        <div className={styles.card}>
            <h2>{props.title}</h2>
            <img className={styles.cardImg} src={props.image} alt="image" />
        </div>
    )
}