const fs = require("fs");
const colors = require("colors");

module.exports = {
    open() {
        return new Promise((res, rej) => {
            const rawdata = fs.readFileSync("./data.json");
            const data = JSON.parse(rawdata);
            res(data);
        });
    },
    save(data) {
        return new Promise((res, rej) => {
            console.info("Saving data".gray);
            const dataToWrite = JSON.stringify(data);
            fs.writeFileSync("./data.json", dataToWrite);
            console.info("Data saved successfully".green);
            res();
        });
    }
};
