const { API_KEY } = process.env;
const { Diet } = require('../db');
const axios = require('axios');

const getDiets = async () => {
    try {
        const existingDiets = await Diet.findAll();
        
        if (existingDiets.length === 0) {
            const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=40&apiKey=${API_KEY}`)
            
            const arrayDiets = ((recipes.data.results).map(recipe => recipe.diets)).flat();
            const diets = arrayDiets.filter((value, index, array) => array.indexOf(value) === index);
            
            const newDiets = await Promise.all(diets.map(async diet => {
                const newDiet = await Diet.create({ name: diet });
                return newDiet;
            }))
            
            const dietsNames = newDiets.map(diet => diet.name);
            return dietsNames;
        } else {
            const dietsNames = existingDiets.map(diet => diet.name);
            return dietsNames;
        }
    } catch (error) {
        throw Error(error);
    }
}

module.exports = getDiets;