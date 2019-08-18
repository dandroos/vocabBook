const { prompt } = require("inquirer");
const BookHelper = require("../modules/BookHelper");
const head = require("./head");
const colors = require("colors");

module.exports = () => {
    return new Promise((res, rej) => {
        console.clear();
        let responses = {};
        console.info(head.red);
        prompt([
            {
                name: "book_name",
                type: "input",
                message: "What would you like to call your book?"
            },
            {
                name: "native_language",
                type: "list",
                message: "What is your native language?",
                choices: ["English", "Español"]
            },
            {
                name: "foreign_language",
                type: "list",
                message: "What is the foreign language for this book?",
                choices: ["English", "Español"]
            }
        ]).then(answers => {
            responses = {
                ...answers
            };

            prompt([
                {
                    name: "confirm",
                    type: "confirm",
                    message: `Create a new book?\n\nBOOK NAME: ${
                        answers.book_name
                    }\nNATIVE LANGUAGE: ${
                        answers.native_language
                    }\nFOREIGN LANGUAGE: ${answers.foreign_language}`
                }
            ]).then(answer => {
                if (answer.confirm) {
                    BookHelper.create(responses).then(() => {
                        console.info("Returning to the main menu".cyan);
                        setTimeout(() => {
                            res();
                        }, 2000);
                    });
                } else {
                    res();
                }
            });
        });
    });
};
