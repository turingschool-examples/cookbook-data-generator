const getData = require('./src/util');
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.KEY)

getData(`https://api.spoonacular.com`,`/recipes/random`, `number=5`);
