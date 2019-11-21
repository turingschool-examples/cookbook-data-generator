import {getData, cleanIngredient, cleanRecipes, getIdsForAllIngredients} from "./src/util.js";
import dotenv  from 'dotenv';
import fs from 'fs';
import {dirname} from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

let cleanedRecipes;

// get all recipes and write them to the output file:

let recipes = getData("https://api.spoonacular.com", "/recipes/random", "number=50");
recipes.then(data => data.json())
  .then(json => {
    //let parsedJson = JSON.parse(stringifiedJson);
    cleanedRecipes = cleanRecipes(json);
    let stringifiedJson = JSON.stringify(cleanedRecipes);
    // look like I have to go back to commonJS... wish I'd used a branch...
    fs.writeFile(__dirname + '/output/recipie-data.js', stringifiedJson, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('recipies file written')
	handleIngredients(cleanedRecipes);
      }
    })
  })
  .catch(err => console.log(err));

function handleIngredients(recipes) {
  let allIngredientIds = getIdsForAllIngredients(recipes);
  let allPromises = [];
  let allIngredients = [];
  Promise.all(allIngredientIds.map(id => getData("https://api.spoonacular.com", `/food/ingredients/${id}/information`)))
  .then(response => {
    return Promise.all(response.map(promise => {
    
      let responseBody = promise.json()
      console.log(responseBody);
      return responseBody;
    
    }))
  })
  .then(data => {
        // Do we need to clean all the data here?
    let cleanedIngredients = cleanIngredients(data);
    console.log(data)
    let stringifiedData = JSON.stringify(cleanedIngredients);
    stringifiedData = 'export default let allIngredientInfo = ' + stringifiedData;
    fs.writeFile(__dirname + "/output/ingredient-data.js", stringifiedData, (err) => {
      if (err) {
        console.log(err)
      } else{
        console.log("ingredient files written");
      }
    }) 
  })
}

