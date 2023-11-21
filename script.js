var fs = require('fs');
var csv = require('csv-parser')

const csvFilePath = ".\hangman_words.csv"

function onButtonClick() {
    const hangmanStr = getRandomElementFromCSV(csvFilePath)
    document.getElementById("changed").textContent = "Your Hangman Word is:" + hangmanStr;
}

document.getElementById("Button1").addEventListener("click", onButtonClick);

function getRandomElementFromCSV(filePath) {
    return new Promise((resolve, reject) => {
        const values = [];

        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            const value = row[Object.keys(row)[0]];
            values.push(value);
        })
        .on('end', () => {
            if (values.lenght == 0) {
                reject(new Error("CSV is empty"));
            } else {
                const randomIndex = Math.floor(Math.random() * values.length);
                const randomValue = values[randomIndex];
                resolve(randomValue);
            }
        })
        .on('error', (error) => {
            reject(new Error('failed to open CSV file: ${randomValue}'));
        })
        .catch((error) => {
            console.error(error.message);
        })
    })
}