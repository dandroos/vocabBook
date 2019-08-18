const { prompt } = require("inquirer");
const BookHelper = require("../modules/BookHelper");
const colors = require("colors");

module.exports = () => {
    return new Promise((res, rej) => {
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
                    message: "Please select the relevant book",
                    when: books.length > 1
                }
            ]).then(answer => {
                if(!answer.book_id){
                    answer.book_id = books[0].id
                }
                BookHelper.findOne(answer.book_id).then(book => {
                    const words = [];
                    for (let category in book.words) {
                        book.words[category].map(word => {
                            words.push({
                                name: word.original_word,
                                value: word
                            });
                        });
                    }
                    prompt([
                        {
                            name: "word",
                            type: "list",
                            choices: words.sort((a, b) => {
                                if (a.name > b.name) {
                                    return 1;
                                } else if (a.name < b.name) {
                                    return -1;
                                } else {
                                    return 0;
                                }
                            }),
                            message: 'Select a word to delete'
                        }
                    ]).then(answer => {
                        const responses = answer;
                        prompt([
                            {
                                name: 'confirm',
                                type: 'confirm',
                                message: `Are you sure you want to delete ${responses.word.original_word}?`
                            }
                        ]).then((answer)=>{
                            if(answer.confirm){
                                BookHelper.deleteWord(book.id, responses.word.id).then(
                                    () => {
                                        res();
                                    }
                                );
                            }else{
                                res();
                            }
                        })
                        
                    });
                });
            });
        });
    });
};
