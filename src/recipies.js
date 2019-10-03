const getData = require('./util');
const fs = require('fs');

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
let recipies = getData(`https://api.spoonacular.com`, `/recipes/random`, `number=100`);
  console.log(recipies)
recipies.then(data => data.json())
  .then(json => {
    let stringifiedJson = JSON.stringify(json);
    fs.writeFile(__dirname + '/../output/recipie-data.js', stringifiedJson, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('recipies file written')
      }
    })
  })
  .catch(err => console.log(err));
