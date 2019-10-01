const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function getData(baseURL, path, query) {
  const fullUrl = `${baseURL}${path}?apiKey=${process.env.KEY}&${query}`
  fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(data => data.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
