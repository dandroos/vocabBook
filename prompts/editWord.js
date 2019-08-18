const { prompt } = require("inquirer");
const BookHelper = require("../modules/BookHelper");
const colors = require("colors");

const head = require("./head");

module.exports = () => {
    return new Promise((res, rej) => {
        console.clear();
        console.info(head.red);
        console.info();
        BookHelper.find().then(books => {
            prompt([
                {
                    name: "book_id",
                    type: "list",
                    choices: () => {
                        return books.map(book => {
                            return {
                                name: book.book_name,
                                value: book.id
                            };
                        });
                    },
                    message:
                        "Please select the book containing the word you would like to edit"
                }
            ]).then(answer => {
                BookHelper.findOne(answer.book_id).then(book => {
                    prompt([
                        {
                            name: "selected_word",
                            type: "list",
                            choices: () => {
                                const choicesArr = [];
                                for (let category in book.words) {
                                    book.words[category].map(word => {
                                        choicesArr.push({
                                            name: word.original_word,
                                            value: word
                                        });
                                    });
                                }
                                return choicesArr.sort((a, b) => {
                                    if (a.name > b.name) {
                                        return 1;
                                    } else if (a.name < b.name) {
                                        return -1;
                                    } else {
                                        return 0;
                                    }
                                });
                            },
                            message:
                                "Please select the word you would like to edit"
                        }
                    ]).then(answer => {
                        const responses = answer.selected_word;
                        console.info(
                            `You have selected ${responses.original_word}`
                        );
                        prompt([
                            {
                                name: "original_word",
                                type: "input",
                                message:
                                    "Please enter the new original word (or press ENTER to skip)",
                                filter(input) {
                                    if (input !== undefined) {
                                        return input;
                                    } else {
                                        return null;
                                    }
                                }
                            },
                            {
                                name: "translated_word",
                                type: "input",
                                message:
                                    "Please enter the new foreign word (or press ENTER to skip)",
                                filter(input) {
                                    if (input !== undefined) {
                                        return input;
                                    } else {
                                        return null;
                                    }
                                }
                            },
                            {
                                name: "category",
                                type: "list",
                                choices: [
                                    "Leave as it is",
                                    "Noun",
                                    "Adjective",
                                    "Verb",
                                    "Adverb"
                                ],
                                message: "Please select a new category",
                                filter(input) {
                                    if (input !== "Leave as it is") {
                                        return input;
                                    } else {
                                        return null;
                                    }
                                }
                            }
                        ]).then(answers => {
                            for (let answer in answers) {
                                if (answers[answer]) {
                                    responses[answer] = answers[answer];
                                }
                            }

                            prompt([
                                {
                                    name: "confirm",
                                    type: "confirm",
                                    message: `You are about to make the following change(s)....\nNATIVE: ${
                                        responses.original_word
                                    }\nFOREIGN: ${
                                        responses.translated_word
                                    }\nCATEGORY: ${responses.category}`
                                }
                            ]).then(answer => {
                                if (answer.confirm) {
                                    BookHelper.updateWord({
                                        ...responses,
                                        modified_at: new Date()
                                    }).then(() => {
                                        setTimeout(() => {
                                            res();
                                        }, 5000);
                                    });
                                }
                            });
                        });
                    });
                });
            });
        });
    });
};
