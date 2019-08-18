const uniqid = require("uniqid");
const StorageHelper = require("./StorageHelper");

module.exports = {
    create(obj) {
        return new Promise((res, rej) => {
            StorageHelper.open()
                .then(data => {
                    data.books.push({
                        id: uniqid("book_"),
                        words: {
                            noun: [],
                            adjective: [],
                            verb: [],
                            adverb: []
                        },
                        ...obj,
                        created_at: new Date(),
                        modified_at: new Date()
                    });
                    StorageHelper.save(data).then(() => {
                        res();
                    });
                })
                .catch(err => rej(err));
        });
    },

    findOne(id) {
        return new Promise((res, rej) => {
            StorageHelper.open()
                .then(data => {
                    data.books.map(i => {
                        if (i.id === id) {
                            res(i);
                        }
                    });
                })
                .catch(err => rej(err));
        });
    },

    find() {
        return new Promise((res, rej) => {
            StorageHelper.open()
                .then(data => {
                    res(data.books);
                })
                .catch(err => rej(err));
        });
    },

    update(book_id, newData) {
        return new Promise((res, rej) => {
            StorageHelper.open()
                .then(data => {
                    const newBooksArr = data.books.map(i => {
                        if (i.id === book_id) {
                            return {
                                ...i,
                                ...newData,
                                modified_at: new Date()
                            };
                        } else {
                            return i;
                        }
                    });
                    data.books = newBooksArr;
                    StorageHelper.save(data).then(() => {
                        res();
                    });
                })
                .catch(err => rej(err));
        });
    },

    delete() {},

    addWord(book_id, newData) {
        return new Promise((res, rej) => {
            StorageHelper.open()
                .then(data => {
                    const newBooksArr = data.books.map(i => {
                        if (i.id === book_id) {
                            const wordsArray = i.words;
                            wordsArray[newData.category].push({
                                ...newData,
                                id: uniqid("word_")
                            });
                            // i.words[i.category].push(newData)
                            return {
                                ...i,
                                words: { ...wordsArray },
                                modified_at: new Date()
                            };
                        } else {
                            return i;
                        }
                    });
                    data.books = newBooksArr;
                    StorageHelper.save(data).then(() => {
                        res();
                    });
                })
                .catch(err => rej(err));
        });
    },

    updateWord(newWordData) {
        return new Promise((res, rej) => {
            StorageHelper.open().then(data => {
                data.books.map(book => {
                    if (book.id === newWordData.book_id) {
                        const words = [];
                        for (let category in book.words) {
                            book.words[category].map(word => {
                                if (word.id === newWordData.id) {
                                    words.push(newWordData);
                                } else {
                                    words.push(word);
                                }
                            });
                        }

                        const newWords = {
                            noun: [],
                            adjective: [],
                            verb: [],
                            adverb: []
                        }

                        words.map((word)=>{
                            newWords[word.category].push(word);
                        })
                        book.words = newWords
                    }
                });
                StorageHelper.save(data).then(()=>{
                    res()
                });
            });
        });
    },

    deleteWord(book_id, word_id){
        return new Promise((res, rej)=>{
            StorageHelper.open().then((data)=>{
                data.books.map((book)=>{
                    if(book.id === book_id){
                        for(let category in book.words){
                            const newArr = book.words[category].filter((word)=>{
                                return word.id !== word_id
                            })
                            book.words[category] = newArr
                        }
                    }
                })
                StorageHelper.save(data).then(()=>{
                    res();
                });
            })
        })
    }
};
