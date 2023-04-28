require('dotenv').config();
const { default: axios } = require('axios');
const { API_KEY } = process.env;
const { Recipe } = require('../db')
const { Op } = require('sequelize')

const getRecipeByName = async (name) => {
    console.log('entrando a la funcioón GetRecipeByName');
    console.log(name);
    try {
        const apiRecipes = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&query=${name}&number=100&apiKey=${API_KEY}`)).data.results;
        const dbRecipes = await Recipe.findAll({
            where: {
                name: {[Op.iLike]: `%${name.toLowerCase()}%`}
            }
        })
        const allRecipes = [...apiRecipes, ...dbRecipes]
        if(allRecipes.length === 0){
            throw Error ('No se encontraron Recetas');
        }
        return allRecipes;
    } catch (error) {
        console.log(error)
        throw Error (error)
    }
}

module.exports = getRecipeByName;