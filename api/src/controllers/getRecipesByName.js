require('dotenv').config();
const { default: axios } = require('axios');
const { API_KEY } = process.env;
const { Recipe } = require('../db')
const { Op } = require('sequelize');

const getRecipeByName = async (title) => {
    console.log('entrando a la función GetRecipeByName');
    console.log(title);
    try {
        const apiRecipes = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`)).data.results;
        const dbRecipes = await Recipe.findAll({
            where: {
                title: {[Op.iLike]: `%${title.toLowerCase()}%`}
            }
        })
        // dbRecipes.length && console.log("Mis recetas creadas -> ", dbRecipes[0].dataValues)
        const filteredApiRecipes = apiRecipes.filter((recipe) => {
            return recipe.title.toLowerCase().includes(title.toLowerCase());
          });
          
        
        const dbRecipesData = [];
        if(dbRecipes.length) {
            dbRecipes.forEach(recipe => dbRecipesData.push(recipe.dataValues))
            // console.log(dbRecipesData)
            // dbRecipesData = dbr;
        }
        // console.log(dbRecipesData)
        const allRecipes = [...dbRecipesData, ...filteredApiRecipes]
        console.log(allRecipes)
        // if(allRecipes.length === 0){
            // console.log("No se encontraron recetas")
            // throw Error ('No se encontraron Recetas');
            // return "No se encontraron receta"
        // }
        return allRecipes;
    } catch (error) {
        console.log(error.message)
        throw Error (error)
    }
}

module.exports = getRecipeByName;