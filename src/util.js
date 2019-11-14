const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function getData(baseURL, path, query) {
  query? const fullUrl = `${baseURL}${path}?apiKey=${process.env.KEY}&${query} : `const fullUrl = `${baseURL}${path}?apiKey=${process.env.KEY}`
  const promise = fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return promise;
}
