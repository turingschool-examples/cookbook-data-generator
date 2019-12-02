import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

function getData(baseURL, path, query) {
  let fullUrl = "";
  query? fullUrl = `${baseURL}${path}?apiKey=${process.env.KEY}&${query}` : fullUrl = `${baseURL}${path}?apiKey=${process.env.KEY}`
  const promise = fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return promise;
}

function cleanIngredient(ingredient) {
  console.log(ingredient);
  let costInCents = Math.floor(Math.random() * Math.floor(1000)) + 50;
  return {
    id: ingredient.id,
    name: ingredient.name,
    estimatedCostInCents: costInCents
  }
}

function cleanRecipes(dirtyRecipes) {
 // This may no longer work the way I had originally intended. May need to refactor if pulling all interaction into index.js

  let recipes = dirtyRecipes.recipes;
  let cleanedRecipes = recipes.map(recipe => {
    let cleanRecipe = {
      name: recipe.title,
      id: recipe.id,
      image: recipe.image,
      ingredients: [],
      instructions: [],
      tags: recipe.dishTypes
    };

    cleanRecipe.ingredients = recipe.extendedIngredients.map( ingredient => {
      return {
        name: ingredient.name,
        id: ingredient.id,
        quanitity: {
	        amount: ingredient.amount,
	        unit: ingredient.unit,
	      },
      }
    });
    //console.log(recipe.analyzedInstructions);
    cleanRecipe.instructions = recipe.analyzedInstructions[0].steps.map(step => {
      return {
        number: step.number,
	      instruction: step.step
      }
    })
   return cleanRecipe;
  })
  return cleanedRecipes;
}

function getIdsForAllIngredients(allRecipes) {
  let totalIngredientIds = allRecipes.reduce((idList, recipe) => {
    recipe.ingredients.forEach(ingredient => {
      if (!idList.includes(ingredient)) {
        idList.push(ingredient.id);
      }
    });
    return idList;
  }, []);
  return totalIngredientIds;
}
export {
  getData,
  cleanIngredient,
  cleanRecipes,
  getIdsForAllIngredients
}
