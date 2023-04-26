const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const getRecipeById = require('./controllers/getRecipeById.js');
const getRecipeByName = require('./controllers/getRecipesByName.js');
const createRecipe = require('./controllers/createRecipe.js');
const getDiets = require('./controllers/getDiets.js')
const { API_KEY } = process.env;

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

server.get('/diets', async (req, res) => {
  try {
    const diets = await getDiets();
    res.status(200).send(diets);
  } catch (error) {
    res.status(400).send({error: error.message})
  }
})

server.get('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipeById(id);
    res.status(200).send(recipe)
  } catch (error) {
    res.status(400).send({error: error.message})
  }
})

server.get('/recipes', async (req, res) => {
  try {
    const { name } = req.query;
    const recipes = await getRecipeByName(name);
    res.status(200).send(recipes);
  } catch (error) {
    res.status(400).send({error: error.message});
  }
})

server.post('/recipes', async (req, res) => {
  try {
    const { id, name, image, summary, level, process, diets } = req.body;
    const newRecipe = await createRecipe({id, name, image, summary, level, process, diets});
    res.status(200).send(newRecipe);
  } catch (error) {
    res.status(400).send({error: error.message})
  }
})

module.exports = server;
