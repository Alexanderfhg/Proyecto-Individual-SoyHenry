const { API_KEY } = process.env;
const { Diet } = require('../db');
const axios = require('axios');

const getDiets = async () => {
    try {
        const existingDiets = await Diet.findAll();
        //  Se verifica si ya hay dietas en la base de datos o no, en caso de no haber se precarga la base de datos con las dietas de la documentación
        //  En caso de que si hayan dietas, solamente se retorna un array con los nombres de las dietas
        if (existingDiets.length === 0) {
            // Consulta a la API
            const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=40&apiKey=${API_KEY}`)
            // Filtrado de las diferenctes dietas
            const arrayDiets = ((recipes.data.results).map(recipe => recipe.diets)).flat();
            const diets = arrayDiets.filter((value, index, array) => array.indexOf(value) === index);
            //  Crea la fila correspondiente para cada dieta
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