const { prompt } = require("inquirer");
const program = require("commander");
const fs = require("fs");

const Word = require("./modules/Word");
const BookHelper = require("./modules/BookHelper");

const mainPrompt = require('./prompts/main');

const rawdata = fs.readFileSync("./data.json");
const data = JSON.parse(rawdata);

console.clear();
mainPrompt()
