import { useEffect, useState } from 'react';
import styles from './Detail.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Detail(props) {

    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    console.log(detail)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const apiDetail = await axios.get(`http://localhost:3001/recipes/${id}`);
                setDetail(apiDetail.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };


        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <span className={styles.loader}></span>
            </div>
        )
    }

    // console.log("entrando a los detalles")
    if(detail.id < 2000000){
        return (
            <div>
                <h2>{detail.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: detail.summary }}></div>
                <h3>healthScore: {detail.healthScore}</h3>
                {detail.diets.map((diet, index) => <h5 key={index}>{diet}</h5>)}
                <img src={detail.image} alt="Image Food" />
                {detail.instructions.map(instruction => {
                    return (
                        <div key={instruction.number}>
                            <h4>{instruction.number}</h4>
                            {instruction.ingredients.map((ingredient, index) => <h5 key={index}>{ingredient.name}</h5>)}
                            <p>{instruction.step}</p>
                        </div>
                    )
                })}
            </div>
        )        
    } else {
        return(
            <div>
                <h2>{detail.title}</h2>
                <div>{detail.summary}</div>
                <h3>healthScore: {detail.healthScore}</h3>
                {detail.diets.map((diet, index) => <h5 key={index}>{diet}</h5>)}
                <img src={detail.image} alt="Image Food" />
                <h4>{detail.process}</h4>
            </div>
        )
    }
}