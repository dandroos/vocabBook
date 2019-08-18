const { prompt } = require("inquirer");
const BookHelper = require("../modules/BookHelper");
const colors = require("colors");
const head = require("./head");

module.exports = () => {



    return new Promise((res, rej)=>{
        console.clear();
        BookHelper.find().then(books => {
            console.info(head.red);
            prompt([
                {
                    name: "book",
                    type: "list",
                    choices: () => {
                        return books.map((i, ind) => {
                            return {
                                name: i.book_name,
                                value: i.id
                            };
                        });
                    },
                    message: "Which book would you like to edit?"
                }
            ]).then(answer => {
                BookHelper.findOne(answer.book).then(book => {
                    const updateAndReturn = (answer)=>{
                        BookHelper.update(book.id, answer);
                        res()
                    }
                    prompt([
                        {
                            name: "option",
                            type: "list",
                            choices: [
                                {
                                    name: "Change book name",
                                    value: "book_name"
                                },
                                {
                                    name: "Change native language",
                                    value: "native_language"
                                },
                                {
                                    name: "Change foreign language",
                                    value: "foreign_language"
                                }
                            ]
                        }
                    ]).then(answer => {
                        switch (answer.option) {
                            case "book_name":
                                prompt([
                                    {
                                        name: "book_name",
                                        type: "input",
                                        message:
                                            "What would you like to call your book?"
                                    }
                                ]).then(answer => {
                                    updateAndReturn(answer);
                                });
                                break;
                            case "native_language":
                                prompt([
                                    {
                                        name: "native_language",
                                        type: "list",
                                        message: "What is your native language?",
                                        choices: ["English", "Español"]
                                    }
                                ]).then(answer => {
                                    updateAndReturn(answer);
                                });
                                break;
                            case "foreign_language":
                                prompt([
                                    {
                                        name: "foreign_language",
                                        type: "list",
                                        message:
                                            "What is the foreign language for this book?",
                                        choices: ["English", "Español"]
                                    }
                                ]).then(answer => {
                                    updateAndReturn(answer);
                                });
                                break;
                        }
                    });
                });
            });
        });
    })
    
};
