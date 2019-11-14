let ingredientIds = require("./ingredientIds").totalIngredientIds;
// need more API calls before I can do this...
// const getData = require("./util");
const allIngredients = [];
const allPromises = [];
console.log(ingredientIds.length);

function cleanIngredient(ingredient) {
  return {
    id: ingredient.id,
    name: ingredient.name,
    estimatedCost: ingredient.estimatedCost
  }
}

ingredientIds.forEach(id => {
  let promise = getData("https://api.spoonacular.com", `/food/ingredients/${id}/information`)
  .then(response => response.json())
  .then(data => {
      let cleanedIngredient = cleanIngredient(data);
      allIngredients.push(cleanedIngredient);
  })
  allPromises.push(promise);
})

Promise.all(allPromises)
  .then(response => {
    let stringifiedData = JSON.stringify(allIngredients);
    fs.writeFile(__dirname + "/../output/ingredient-data.js", stringifiedData, (err) => {
      if (err) {
        console.log(err)
      } else{
        console.log("ingredient files written");
      }
    }) 
  })
  .catch(err => console.log(err));
