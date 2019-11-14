let allRecipes = require("../output/recipie-data").allRecipes;

let totalIngredientIds = allRecipes.reduce((idList, recipe) => {
  recipe.ingredients.forEach(ingredient => {
    if (!idList.includes(ingredient)) {
      idList.push(ingredient.id);
    }
  });
  return idList;
}, []);

module.exports = {
  totalIngredientIds
};
