const { prompt } = require("inquirer");
const program = require("commander");
const fs = require("fs");

const Word = require("./modules/Word");
const BookHelper = require("./modules/BookHelper");

const mainPrompt = require('./prompts/main');

const rawdata = fs.readFileSync("./data.json");
const data = JSON.parse(rawdata);

// program
//     .version("1.0.0")
//     .description("A CLI vocab book for learning another language!");

console.clear();

mainPrompt()

// add-word                     -a
// edit-word                    -e
// delete-word                  -d
// start-test                   -t
// test-scores                  -ts
// add-book                     -ab
// view-book                    -v

//USER OPENS THE APP
//USER IS PRESENTED WITH WELCOME SCREEN
// program
//     .command("add-word")
//     .alias("a")
//     .action(() => {
//         const responses = {};
//         prompt([
//             {
//                 name: "book",
//                 type: "list",
//                 choices: () => {
//                     return data.books.map(i => {
//                         return i.book_name;
//                     });
//                 },
//                 message: "Which vocab book would you like to add this word to?",
//                 filter(input) {
//                     return data.books.reduce((prev, curr) => {
//                         if (curr.book_name === input) {
//                             return curr;
//                         }
//                     });
//                 }
//             }
//         ]).then(answers => {
//             responses.book = answers.book;
//             prompt([
//                 {
//                     name: "original_word",
//                     type: "input",
//                     message: "What is the word in your language?"
//                 },
//                 {
//                     name: "translated_word",
//                     type: "input",
//                     message: "What is the word translated?"
//                 },
//                 {
//                     name: "category",
//                     type: "list",
//                     choices: ["Noun", "Verb", "Adjective", "Other"]
//                 }
//             ]).then(answers => {
//                 responses.original_word = answers.original_word.toLowerCase();
//                 responses.translated_word = answers.translated_word.toLowerCase();
//                 responses.category = answers.category.toLowerCase();
//                 prompt([
//                     {
//                         name: "confirm",
//                         type: "confirm",
//                         message: `Are you sure you would like to add the following word?:\n\nORIGINAL WORD: ${
//                             answers.original_word
//                         }\nTRANSLATED WORD: ${
//                             answers.translated_word
//                         }\nCATEGORY: ${answers.category}\n`
//                     }
//                 ]).then(answer => {
//                     if (answer.confirm) {
//                         const word = new Word(responses);
//                         word.save();
//                     }
//                 });
//             });
//         });
//     });


// SHOW THEM HOW MANY WORDS ARE IN THEIR BOOK
// SHOW THEIR AVERAGE SCORE ON THE TESTS
//USER IS PRESENTED WITH OPTIONS
// 1. CREATE NEW VOCAB BOOK
// ASK FOR NATIVE LANGUAGE
// ASK FOR LEARNING LANGUAGE
// GET CONFIRMATION
// 2. OPEN VOCAB BOOK
// SHOW OPTION MENU CONTAINING LIST OF VOCAB BOOKS

//USER IS PRESENTED WITH OPTIONS
// 1. ENTER NEW WORD
// 2. VIEW/EDIT VOCAB BOOK
// 3. TEST ME
// SEPARATOR
// < MAIN MENU

// IF USER SELECTS 'ENTER NEW WORD'
// USER IS ASKED 'WHAT IS IT IN ENGLISH?'
// USER IS ASKED 'WHAT IS IT IN SPANISH?'
// USER IS ASKED WHAT CATEGORY THE WORD IS
// USER IS ASKED TO CONFIRM CHOICES
// USER IS ASKED IF THEY WOULD LIKE TO ENTER ANOTHER WORD
// IF USER SELECTS NO, THEY ARE RETURNED TO THE MAIN MENU

// IF USER SELECTS 'VIEW/EDIT VOCAB BOOK'
// PRESENT THEM WITH A CHOICE OF ADJECTIVES, NOUNS , VERBS, OTHER, ALL

// FILTER RESULTS BASED ON CHOICE AND RETURN AN OPTION MENU SO THE USER CAN VIEW/SELECT WORDS

//IF THE USER SELECTS A WORD
// PRESENT AN OPTION MENU
// 1. EDIT WORD
// PRESENT USER WITH THE ENGLISH WORD
// PRESENT USER WITH THE SPANISH WORD
// PRESENT THE CATEGORY
// 2. DELETE WORD
// GET CONFIRMATION OF DELETE
// 3. EXIT MENU
// IF THE USER HITS ESC, RETURN TO THE MAIN MENU

// IF USER SELECTS 'TEST ME'
// PRESENT OPTIONS
// 1. NOUNS
// 2. VERBS
// 3. ADJECTIVES
// 4. OTHER
// 5. ALL

// ASK USER IF THEY WANT TO ANSWER SPANISH > ENGLISH OR ENGLISH > SPANISH

// ASK USER HOW MANY QUESTIONS THEY WANT TO ANSWER
// IF IT'S MORE THAN IS IN THEIR BOOK, TELL THEM AND ASK THEM TO ENTER A NUMBER LOWER THAN THE AMOUNT THEY HAVE
// ASK USER FOR MULTIPLE CHOICE SELECTION OF 2, 3 OR 5

// GENERATE TEST
// POPULATE AN ANSWERS ARRAY WITH UNIQUE ENTRIES
// POPULATE A QUESTIONS ARRAY WITH ONE RIGHT ANSWER AND 1, 2 OR 4 OTHER RANDOM UNIQUE ENTRIES
// START THE TEST
// SHOW USER THE WORD IN SPANISH/ENGLISH
// SHOW USER A MENU WITH THE POSSIBLE ANSWERS
// IF THE USER GETS IT RIGHT SAY WELL DONE!
// IF THEY GET IT WRONG SAY BAD LUCK!
// WHEN ALL QUESTIONS ANSWERED
// PROVIDE FINAL SCORE
// PROVIDE AVERAGE SCORE
// ASK TO PLAY AGAIN
// program.parse(process.argv);
