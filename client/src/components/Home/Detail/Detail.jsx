import styles from './Detail.module.css';

let count = 0;
export default function Detail(props) {

    if (Object.keys(props.detail).length !== 0 && count !== 0) {
        console.log(props.detail)
        count = 0;
        return (
            <div>
                <h1>{props.detail.title}</h1>
                <div dangerouslySetInnerHTML = {{ __html: props.detail.summary}}></div>
                <img src={props.detail.image} alt="Image Food" />
            </div>
        )
    } else if(count === 0){
        count++;
        return (
            <div>
                <h1>Cargando...</h1>
            </div>
        )
    }
}