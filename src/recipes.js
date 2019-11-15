const getData = require('./util');
const fs = require('fs');
let cleanedJson;
/*
recipe data structure:
[
  {
    recipeName: 'someName',
    ingredients: [
    {ingredient object},
    {ingredient object}
  ],
    instructions:[
    {data from analyzed instructions property},
    {data from analyzed instructions property},
    ...
  ],
  tags: [tag strings]
  }
]

*/


// must be async
let recipies = getData("https://api.spoonacular.com", "/recipes/random", "number=50");
  console.log(recipies)
recipies.then(data => data.json())
  .then(json => {
    //let parsedJson = JSON.parse(stringifiedJson);
    cleanedJson = cleanRecipes(json);
    let stringifiedJson = JSON.stringify(cleanedJson);
    fs.writeFile(__dirname + '/../output/recipie-data.js', stringifiedJson, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('recipies file written')
      }
    })
  })
  .catch(err => console.log(err));


function cleanRecipes(dirtyRecipes) {
//  console.log(dirtyRecipes[0]);
//  console.log(dirtyRecipes.recipes);
  let recipes = dirtyRecipes.recipes;
  let cleanedRecipes = recipes.map(recipe => {
    let cleanRecipe = {
      name: recipe.title,
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
//    console.log(recipe.analyzedInstructions);
    cleanRecipe.instructions = recipe.analyzedInstructions[0].steps.map(step => {
      return {
        number: step.number,
	instruction: step.step
      }})
   return cleanRecipe;
  })
  return cleanedRecipes;
}

module.exports = cleanedJson;
// Now my order of execution seems to be messed up, I think I need to consolidate the workflow into one file to do everything at once
