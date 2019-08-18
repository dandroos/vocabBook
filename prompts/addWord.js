const { prompt } = require("inquirer");
const BookHelper = require("../modules/BookHelper");

module.exports = () => {
    return new Promise((res, rej) => {
        BookHelper.find().then(books => {
            prompt([
                {
                    name: "book_id",
                    type: "list",
                    choices: books.map(i => {
                        return {
                            name: i.book_name,
                            value: i.id
                        };
                    }),
                    message:
                        "Which vocab book would you like to add this word to?",
                    when: books.length > 1
                },
                {
                    name: "original_word",
                    type: "input",
                    message: "What is the word in your language?",
                    filter(input) {
                        return input.toLowerCase();
                    }
                },
                {
                    name: "translated_word",
                    type: "input",
                    message: "What is the word translated?",
                    filter(input) {
                        return input.toLowerCase();
                    }
                },
                {
                    name: "category",
                    type: "list",
                    message: "Please select a category",
                    choices: ["Noun", "Verb", "Adjective", "Adverb"],
                    filter(input) {
                        return input.toLowerCase();
                    }
                }
            ]).then(answers => {
                if (!answers.book_selection) {
                    answers.book_selection = books[0].id;
                }
                const wordResponses = answers;

                prompt([
                    {
                        name: "confirm",
                        type: "confirm",
                        message: "Sure?"
                    }
                ]).then(answers => {
                    if (answers.confirm) {
                        BookHelper.addWord(wordResponses.book_selection, {
                            ...wordResponses,
                            created_at: new Date(),
                            modified_at: new Date()
                        }).then(() => {
                            prompt([
                                {
                                    name: "return",
                                    type: "input",
                                    message: "Hit ENTER to return"
                                }
                            ]).then(() => {
                                res();
                            });
                        });
                    } else {
                        res();
                    }
                });

                // console.log(answers);
                // setTimeout(()=>{
                //     res()
                // }, 5000)
            });
        });
    });
};
