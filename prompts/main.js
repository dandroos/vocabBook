const { prompt, Separator } = require("inquirer");
const BookHelper = require("../modules/BookHelper");
const colors = require("colors");
const head = require("./head");

const addBookPrompt = require("./addBook");
const updateBookPrompt = require("./updateBook");
const addWordPrompt = require("./addWord");
const viewBookPrompt = require("./viewBook");
const editWordPrompt = require("./editWord");
const deleteWordPrompt = require("./deleteWord");

module.exports = () => {
    (function runMainPrompt() {
        console.clear();
        console.info(head.red);
        BookHelper.find().then(books => {
            if (books.length > 1) {
                console.info("BOOK LIST".bold);
                books.map(book => {
                    console.info(`NAME: ${book.book_name}`);
                });
            }
            console.info();
            prompt([
                {
                    name: "option",
                    type: "list",
                    choices: [
                        {
                            name: "View book",
                            value: "view_book"
                        },
                        {
                            name: "Add a new word",
                            value: "add_word"
                        },
                        {
                            name: "Edit a word",
                            value: "edit_word"
                        },
                        {
                            name: "Delete a word",
                            value: "delete_word"
                        },
                        new Separator(),
                        {
                            name: "Add new book",
                            value: "add_book"
                        },
                        {
                            name: "Update existing book",
                            value: "update_book"
                        }
                    ],
                    message: "MAIN MENU"
                }
            ]).then(answer => {
                answer.option === "view_book"
                    ? viewBookPrompt().then(runMainPrompt)
                    : null;
                answer.option === "update_book"
                    ? updateBookPrompt().then(runMainPrompt)
                    : null;
                answer.option === "add_book"
                    ? addBookPrompt().then(runMainPrompt)
                    : null;
                answer.option === "add_word"
                    ? addWordPrompt().then(runMainPrompt)
                    : null;
                answer.option === "edit_word"
                    ? editWordPrompt().then(runMainPrompt)
                    : null;
                answer.option === "delete_word"
                    ? deleteWordPrompt().then(runMainPrompt)
                    : null;
            });
        });
    })();
};
