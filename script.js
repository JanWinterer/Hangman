const csvUrlPath = "https://raw.githubusercontent.com/JanWinterer/Hangman/main/hangman_words.csv"

async function onButtonClick() {
    try {
        var hangmanStr = await getRandomElementFromCSV(csvUrlPath);
        document.getElementById("changed").textContent = "Your Hangman Word is: " + hangmanStr;
    } catch (error) {
        console.error("Error fetching or processing the CSV data: ", error);
        document.getElementById("changed").textContent = "Error fetching word.";
    }
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


async function getRandomElementFromCSV(csvUrlPath) {
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