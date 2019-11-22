import fs from 'fs';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import faker from 'faker';
import allIngredients from './output/ingredient-data.js'; 
import allRecipes from './output/recipe-data.js';
import { getIdsForAllIngredients } from './src/utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));


let users = [];
let ingredientIds = getIdsForAllIngredients(allRecipes);

function getRandomNumberOfRandomIds(ids) {
  let allItems = [];
  let numberOfIds = ids.length;
  let numberOfIdsToTake = Math.floor(Math.random() * numberOfIds);
  for (let i = 0; i < numberOfIdsToTake; i++){
    // get a random id, and give it a random number from 1 - 5 for the amount
    let idOfElementToGrab = Math.floor(Math.random() * numberOfIds);
    let amountOfIngredient = Math.floor(Math.random() * 5)
    let elementToGrab = ids[idOfElementToGrab];
    allItems.push({ingredient: elementToGrab, amount: amountOfIngredient});
  }
  return allItems;
}

for (let i = 1; i < 50; i++){
  let user = {};
  user.id = i;
  user.name = faker.name.firstName + faker.name.lastName;
  user.pantry = getRandomNumberOfRandomIds(ingredientIds); 
  user.push(user);
}

// Write the file next
// fs.writeFile
