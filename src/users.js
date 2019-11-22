import fs from 'fs';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import faker from 'faker';
// import allingredientinfo from './output/ingredient-data.js'; 
import allRecipes from '../output/recipe-data.js';
import { getIdsForAllIngredients } from './util.js';

const __dirname = dirname(fileURLToPath(import.meta.url));


let ingredientIds = getIdsForAllIngredients(allRecipes);

function getRandomNumberOfRandomIds(ids) {
  let allItems = [];
  let numberOfIds = ids.length;
  let numberOfIdsToTake = Math.floor(Math.random() * numberOfIds);
  for (let i = 0; i < numberOfIdsToTake; i++){
    // get a random id, and give it a random number from 1 - 5 for the amount
    let idOfElementToGrab = Math.floor(Math.random() * numberOfIds);
    let amountOfIngredient = Math.floor(Math.random() * 5) + 1;
    let elementToGrab = ids[idOfElementToGrab];
    allItems.push({ingredient: elementToGrab, amount: amountOfIngredient});
  }
  return allItems;
}

function makeUsers () {
  let users = [];
  for (let i = 1; i < 50; i++){
    let user = {};
    user.id = i;
    user.name = faker.name.firstName() + ' ' + faker.name.lastName();
    user.pantry = getRandomNumberOfRandomIds(ingredientIds); 
    users.push(user);
  }
  return users;
}

function outputUsersFile (usersData) {
  let stringifiedUsers = JSON.stringify(usersData);
  fs.writeFile(__dirname + '/../output/users-data.js', stringifiedUsers, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('users file written'); 
    }
  }) 
}

let users = makeUsers();
outputUsersFile(users);
