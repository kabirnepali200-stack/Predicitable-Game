const apiKey = "0827e35cf4mshe75681ee2d53291p1085aajsne94482be648f";

async function getFixtures() {
    const url = "https://api-football-v1.p.rapidapi.com/v3/fixtures?date=2025-08-30&league=39&season=2025"; 
    // ⚠️ Change date/league/season if needed
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        const matchesDiv = document.getElementById("matches");

        if (data.response && data.response.length > 0) {
            data.response.forEach(match => {
                const matchDiv = document.createElement("div");
                matchDiv.innerHTML = `
                    <p>${match.teams.home.name} vs ${match.teams.away.name}</p>
                    <button onclick="getPrediction(${match.fixture.id})">Predict</button>
                `;
                matchesDiv.appendChild(matchDiv);
            });
        } else {
            matchesDiv.innerHTML = "<p>No live matches today. Showing demo match:</p>";
            matchesDiv.innerHTML += `
                <p>Barcelona vs Real Madrid</p>
                <button onclick="getPrediction(123456)">Predict</button>
            `;
        }

    } catch (error) {
        console.error(error);
    }
}

async function getPrediction(fixtureId) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/predictions?fixture=${fixtureId}`;
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const prediction = data.response[0]?.predictions?.winner?.name || "No prediction available";

        document.getElementById("predictionBox").innerHTML = "Predicted Winner: " + prediction;
    } catch (error) {
        console.error(error);
    }
}

// Run when page loads
getFixtures();
