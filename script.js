const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const csvUrlPath = "https://raw.githubusercontent.com/JanWinterer/Hangman/main/hangman_words.csv";
const proxiedUrl = proxyUrl + csvUrlPath;

async function onButtonClick() {
    try {
        var hangmanStr = await getRandomElementFromCSV(proxiedUrl);
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

    for (let i = 0; i < lineResult.length; i++) {
        result.push(lines[i].split(","));
    }

    return result; // This is an array of arrays
}

document.getElementById("Button1").addEventListener("click", onButtonClick);


async function getRandomElementFromCSV(csvUrlPath) {
    return fetchCSV(csvUrlPath)
        .then(csvData => {
            const parsedCSV = parseCSV(csvData);
            if (parsedCSV.length === 0){
                throw new Error("CSV is empty");
            }
            const randomIndex = Math.floor((Math.random() * parsedCSV.length));
            const randomValue = parsedCSV[randomIndex];
            return randomValue;
    })
    .catch(error => {
        console.error("Error feching CSV data!");
        throw error;
    });
}