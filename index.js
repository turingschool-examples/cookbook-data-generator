//const getData = require('./src/util');
import {getData, cleanIngredient, cleanRecipes} from "./src/util.js";
import dotenv  from 'dotenv';

dotenv.config();

 console.log(cleanIngredient)

// getData("https://api.spoonacular.com",`/recipes/random`, `number=100`);
