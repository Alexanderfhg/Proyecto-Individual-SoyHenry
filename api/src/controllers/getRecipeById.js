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
                const diets = [];
                if (recipe.data.vegetarian) diets.push('vegetarian');
                if (recipe.data.vegan) diets.push('vegan');
                if (recipe.data.glutenFree) diets.push('glutenFree');
                return diets;
            }
            const instructions = () => {
                console.log("length ->", recipe.data.analyzedInstructions.length)
                if (recipe.data.analyzedInstructions.length) {
                    return recipe.data.analyzedInstructions[0].steps;
                } else return [];
            }
            return {
                id: recipe.data.id,
                type: dietType(),
                title: recipe.data.title,
                healthScore: recipe.data.healthScore,
                image: recipe.data.image,
                summary: recipe.data.summary,
                diets: recipe.data.diets,
                instructions: instructions()
            }
        } catch (error) {
            // console.log(error.message)
            throw Error(error)
        }
    } else {
        try {
            const recipe = await Recipe.findByPk(id)
            console.log(recipe.dataValues.diets)
            const { title, image, summary, healthScore, process, /* diets */ } = recipe.dataValues;
            return {
                id: id,
                title: title,
                image: image,
                summary: summary,
                healthScore: healthScore,
                process: process,
                diets: recipe.dataValues.diets
            }
        } catch (error) {
            throw Error(error)
        }
    }
}

module.exports = getRecipeById;