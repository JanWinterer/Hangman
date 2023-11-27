const csvUrlPath = "https://github.com/JanWinterer/Hangman/blob/9e3f49e58445cd61fd0a7361e2bc3dcaffb078c3/hangman_words.csv"

function onButtonClick() {
    var hangmanStr = getRandomElementFromCSV(csvUrlPath)
    document.getElementById("changed").textContent = "Your Hangman Word is:" + hangmanStr;
}

async function fetchCSV(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.text();
}

function parseCSV(csvData) {
    const lines = csvData.split("\n");
    const result = [];
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }

    return result; // This is an array of objects
}

document.getElementById("Button1").addEventListener("click", onButtonClick);


function getRandomElementFromCSV(csvUrlPath) {
    return fetchCSV(csvUrlPath)
        .then(csvData => {
            const parsedCSV = parseCSV(csvData);
            if (parseCSV.length === 0){
                throw new Error("CSV is empty");
            }
            const randomIndex = Math.floor((Math.random() * parsedCSV.length()));
            const randomValue = parsedCSV[randomIndex];
            return randomValue;
    })
    .catch(error => {
        console.error("Error feching CSV data!");
        throw error;
    });
}