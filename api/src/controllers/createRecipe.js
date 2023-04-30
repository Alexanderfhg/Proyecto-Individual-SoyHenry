const { Recipe } = require('../db');

const createRecipe = async (recipe) => {
    try {
        const newRecipe = await Recipe.create({
            title: recipe.title,
            image: recipe.image,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            process: recipe.process
        })
        newRecipe.addDiets(recipe.diets)
        return newRecipe.dataValues;
    } catch (error) {
        throw new Error (error);
    }
}

module.exports = createRecipe;