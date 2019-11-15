
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


module.exports = {
  getIdsForAllIngredients
};
