const getData = require('./src/util');
const dotenv = require('dotenv');

dotenv.config();

getData('https://api.spoonacular.com/recipes/random');
