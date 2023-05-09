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
    if (detail.id < 2000000) {
        return (
            <div className={styles.recipeDetail}>
                <h2 className={styles.recipeTitle}>{detail.title}</h2>
                <div className={styles.recipeSummary} dangerouslySetInnerHTML={{ __html: detail.summary }}></div>
                <h3 className={styles.recipeScore}>healthScore: {detail.healthScore}</h3>
                <div className={styles.recipeDiets}>
                    {detail.diets.map((diet, index) => <h5 key={index} className={styles.recipeDiet}>{diet}</h5>)}
                </div>
                <img className={styles.recipeImage} src={detail.image} alt="Image Food" />
                <div className={styles.recipeInstructions}>
                    {detail.instructions.map(instruction => {
                        return (
                            <div key={instruction.number} className={styles.recipeStep}>
                                <h4 className={styles.recipeStepNumber}>{instruction.number}</h4>
                                <div className={styles.recipeIngredients}>
                                    {instruction.ingredients.map((ingredient, index) => <h5 key={index} className={styles.recipeIngredient}>{ingredient.name}</h5>)}
                                </div>
                                <p className={styles.recipeStepText}>{instruction.step}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.recipeDetail}>
                <h2 className={styles.recipeTitle}>{detail.title}</h2>
                <div className={styles.recipeSummary}>{detail.summary}</div>
                <h3 className={styles.recipeScore}>healthScore: {detail.healthScore}</h3>
                <div className={styles.recipeDiets}>
                    {detail.diets.map((diet, index) => <h5 key={index} className={styles.recipeDiet}>{diet}</h5>)}
                </div>
                <img className={styles.recipeImage} src={detail.image} alt="Image Food" />
                <h4 className={styles.recipeProcess}>{detail.process}</h4>
            </div>
        )
    }
}