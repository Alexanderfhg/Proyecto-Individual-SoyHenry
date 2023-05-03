// const { Recipe } = require('../db');
require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Recipe } = require('../db')

const getRecipeById = async (id) => {
    console.log('entrando a la función id:' + id + ' apikey=' + API_KEY + ".");
    if (id < 2000000) {
        try {
            const recipe = await axios.get(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
            )
            const dietType = () => {
                if (recipe.data.vegetarian) return 'vegetarian';
                if (recipe.data.vegan) return 'vegan';
                if (recipe.data.glutenFree) return 'glutenFree;'
            }
            return {
                id: recipe.data.id,
                type: dietType(),
                title: recipe.data.title,
                healthScore: recipe.data.healthScore,
                image: recipe.data.image,
                summary: recipe.data.summary,
                diets: recipe.data.diets,
                instructions: recipe.data.analyzedInstructions[0].steps
            }
        } catch (error) {
            throw Error(error)
        }
    } else {
        try {
            const recipe = await Recipe.findByPk(id)
            const { title, image, summary, healthScore, process } = recipe.dataValues;
            return {
                id: id,
                title: title,
                image: image,
                summary: summary,
                healthScore: healthScore,
                process: process
            }        
        } catch (error) {
            throw Error(error)
        }
    }
}

module.exports = getRecipeById;