const { Recipe } = require('../db');

const createRecipe = async (recipe) => {
    const nameDiets = [];
    const selectDiets = () => {
        if(recipe.diets.includes(1)) nameDiets.push('gluten free');
        if(recipe.diets.includes(2)) nameDiets.push('dairy free');
        if(recipe.diets.includes(3)) nameDiets.push('lacto ovo vegetarian');
        if(recipe.diets.includes(4)) nameDiets.push('vegan ');
        if(recipe.diets.includes(5)) nameDiets.push('paleolithic ');
        if(recipe.diets.includes(6)) nameDiets.push('primal ');
        if(recipe.diets.includes(7)) nameDiets.push('whole 30 ');
        if(recipe.diets.includes(8)) nameDiets.push('pescatarian ');
        if(recipe.diets.includes(9)) nameDiets.push('ketogenic ');
        if(recipe.diets.includes(10)) nameDiets.push('fodmap friendly ');
    }
    selectDiets();
    console.log(nameDiets)
    try {
        const newRecipe = await Recipe.create({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            process: recipe.process,
            diets: nameDiets 
        })
        newRecipe.addDiets(recipe.diets)
        console.log(newRecipe.dataValues)
        return newRecipe.dataValues;
    } catch (error) {
        console.log(error)
        throw new Error (error);
    }
}

module.exports = createRecipe;