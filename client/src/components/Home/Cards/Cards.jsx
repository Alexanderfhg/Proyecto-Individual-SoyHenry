import Card from './Card/Card' 
import styles from './Cards.module.css';

export default function Cards (props) {
    const recipes = props.recipes;
    // recipes && console.log(recipes[0].title)
    if(recipes.length){
        return (
            <div className={styles.cardContainer}>
                <div className={styles.cards}>
                    {recipes.map(recipe => (
                        <Card key={recipe.id} title={recipe.title} image={recipe.image}/>
                    ))}
                </div>
            </div>
        )
    }

}