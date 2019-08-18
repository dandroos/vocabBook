const { prompt, Separator } = require("inquirer");
const columnify = require("columnify");
const moment = require("moment");
const colors = require("colors");
const head = require("./head");
const BookHelper = require("../modules/BookHelper");
const addWordPrompt = require("./addWord");

module.exports = () => {
    return new Promise((res, rej) => {
        console.clear();
        console.info(head.red);
        BookHelper.find().then(books => {
            prompt([
                {
                    name: "book_selection",
                    type: "list",
                    choices: () => {
                        return books.map(book => {
                            return {
                                name: book.book_name,
                                value: book.id
                            };
                        });
                    },
                    message: "Please select a book",
                    when: books.length > 1
                }
            ]).then(answer => {
                if (Object.keys(answer) < 1) {
                    answer.book_selection = books[0].id;
                }
                console.clear();
                console.info(head.red);
                BookHelper.findOne(answer.book_selection).then(book => {
                    console.info(`You are currently viewing....`.magenta);
                    console.info(book.book_name.cyan);
                    console.info();
                    // Total words (broken down by category)
                    console.info(`This book contains....`.magenta);
                    console.info(`Nouns: ${book.words.noun.length}`.cyan);
                    console.info(`Verbs: ${book.words.verb.length}`.cyan);
                    console.info(
                        `Adjectives: ${book.words.adjective.length}`.cyan
                    );
                    console.info(`Adverbs: ${book.words.adverb.length}`.cyan);
                    // Last modified
                    console.info();
                    console.info("Additional info....".magenta);
                    console.info(
                        `Created: ${moment(book.created_at).from(new Date())}`
                            .cyan
                    );
                    console.info(
                        `Modified: ${moment(book.modified_at).from(new Date())}`
                            .cyan
                    );
                    console.info();
                    prompt([
                        {
                            name: "option",
                            type: "list",
                            choices: [
                                {
                                    name: "VIEW ALL",
                                    value: "all"
                                },
                                new Separator(),
                                {
                                    name: "VIEW NOUNS",
                                    value: "noun"
                                },
                                {
                                    name: "VIEW VERBS",
                                    value: "verb"
                                },
                                {
                                    name: "VIEW ADJECTIVES",
                                    value: "adjective"
                                },
                                {
                                    name: "VIEW ADVERBS",
                                    value: "adverb"
                                },
                                new Separator(),
                                {
                                    name: "BACK TO MAIN MENU",
                                    value: "mainmenu"
                                }
                            ],
                            message: "Please select an option",
                            pageSize: 8
                        }
                    ]).then(answer => {
                        console.clear();
                        console.info(head.red);
                        console.info();
                        console.info(book.book_name.cyan);
                        switch (answer.option) {
                            case "all":
                                for (let category in book.words) {
                                    const displayArr = [];
                                    console.info(
                                        category.toUpperCase().yellow +
                                            "S".yellow
                                    );
                                    console.info(
                                        "---------------------------------"
                                            .magenta
                                    );
                                    book.words[category].map(word => {
                                        displayArr.push({
                                            ORIGINAL: word.original_word,
                                            TRANSLATION: word.translated_word
                                        });
                                    });

                                    console.info(
                                        columnify(
                                            displayArr.sort((a, b) => {
                                                if (a.ORIGINAL > b.ORIGINAL) {
                                                    return 1;
                                                } else if (
                                                    a.ORIGINAL < b.ORIGINAL
                                                ) {
                                                    return -1;
                                                } else {
                                                    return 0;
                                                }
                                            }),
                                            {
                                                // minWidth: 35,
                                                columnSplitter: "|",
                                                showHeaders: false
                                            }
                                        )
                                    );
                                    console.info();
                                }
                                prompt([
                                    {
                                        name: "return",
                                        type: "input",
                                        message: "Hit ENTER to return"
                                    }
                                ]).then(() => {
                                    res();
                                });
                                break;
                            case "noun":
                            case "verb":
                            case "adjective":
                            case "adverb":
                                const displayArr = [];
                                console.clear();
                                console.info(head.red);
                                console.info(
                                    `${answer.option.toUpperCase()}S`.yellow
                                );
                                console.info(
                                    "---------------------------------".magenta
                                );
                                book.words[answer.option].map(word => {
                                    displayArr.push({
                                        ORIGINAL: word.original_word,
                                        TRANSLATION: word.translated_word
                                    });
                                });
                                console.info(
                                    columnify(
                                        displayArr.sort((a, b) => {
                                            return (
                                                a.ORIGINAL[0].toLowerCase() >
                                                b.ORIGINAL[0].toLowerCase()
                                            );
                                        }),
                                        {
                                            // minWidth: 35,
                                            columnSplitter: "|",
                                            showHeaders: false
                                        }
                                    )
                                );
                                console.info();
                                prompt([
                                    {
                                        name: "return",
                                        type: "list",
                                        choices: [
                                            {
                                                name: "Return to book menu",
                                                value: "return"
                                            }
                                        ],
                                        message: "OPTION(S)"
                                    }
                                ]).then(() => {
                                    res();
                                });
                                break;
                            case "add_word":
                                addWordPrompt(book.id).then(() => {
                                    prompt([
                                        {
                                            name: "return",
                                            type: "list",
                                            choices: [
                                                {
                                                    name: "Return to book menu",
                                                    value: "return"
                                                }
                                            ],
                                            message: "OPTION(S)"
                                        }
                                    ]).then(() => {
                                        res();
                                    });
                                });
                        }
                    });
                });
            });
        });
    });

    // DISPLAY
};

// MENU
// 1. View all
// 2. View nouns
// 3. View verbs
// 4. View adjectives
// 5. View other
// 6. Edit book details

// 7. Back to main menu
