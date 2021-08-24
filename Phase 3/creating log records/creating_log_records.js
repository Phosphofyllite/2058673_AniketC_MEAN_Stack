let fs = require("fs");
let readline = require("readline-sync");
let users = JSON.parse(fs.readFileSync("users.json").toString());
let firstname =  readline.question(`Enter the first name:        `);
let lastname =  readline.question(`Enter the last name:         `);
let gender =  readline.question(`Enter the gender:            `);
let email = readline.questionEMail(`Enter the email address:     `);
let dateTime = new Date().toLocaleString();
console.log("successfully read user input");
debugger

newUser = {fname:firstname, lname:lastname, gndr: gender, eml: email, dt:dateTime}
users.push(newUser);
console.log("successfully pushed new user to array")
debugger
fs.writeFileSync("users.json", JSON.stringify(users));
console.log(`successfully added new user to json file at:    `+ new Date().toLocaleString())

