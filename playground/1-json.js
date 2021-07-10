const fs = require('fs');

const data = fs.readFileSync('1-json.json');
const jsonData = JSON.parse(data.toString());

const myName = 'Mark';
const myAge = 'Infinity';

jsonData.name = myName;
jsonData.age = myAge;

fs.writeFileSync('1-json.json', JSON.stringify(jsonData));

console.log(jsonData);