import fs from 'fs';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import faker from 'faker';

const __dirname = dirname(fileURLToPath(import.meta.url));

function makeUsers () {
  let users = [];
  for (let i = 1; i < 50; i++){
    let user = {};
    user.id = i;
    user.name = faker.name.firstName() + ' ' + faker.name.lastName();
    user.recipesToCook = []; 
    users.push(user);
  }
  return users;
}

function outputUsersFile (usersData) {
  let stringifiedUsers = JSON.stringify(usersData, null, 2);
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
