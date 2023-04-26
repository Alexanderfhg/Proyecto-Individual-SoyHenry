const { Recipe } = require('../db');

const createRecipe = async (recipe) => {
    try {
        const newRecipe = await Recipe.create({
            name: recipe.name,
            image: recipe.image,
            summary: recipe.summary,
            level: recipe.level,
            process: recipe.process
        })
        newRecipe.addDiets(recipe.diets)
        return newRecipe.dataValues;
    } catch (error) {
        throw new Error (error);
    }
}

module.exports = createRecipe;