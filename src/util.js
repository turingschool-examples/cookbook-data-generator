const fetch = require('node-fetch');

module.exports = function getData(url) {
  fetch(url)
    .then(data => data.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
