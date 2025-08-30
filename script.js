const apiKey = "0827e35cf4mshe75681ee2d53291p1085aajsne94482be648f";

// Select the container where predictions will show
const predictionsContainer = document.getElementById("predictions");

async function getPredictions() {
    try {
        const response = await fetch(
            "https://api-football-v1.p.rapidapi.com/v3/fixtures?date=2025-08-30", 
            {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                    "x-rapidapi-key": apiKey
                }
            }
        );

        const data = await response.json();

        // Clear container first
        predictionsContainer.innerHTML = "";

        if (!data.response || data.response.length === 0) {
            predictionsContainer.innerHTML = "<p>No matches found today.</p>";
            return;
        }

        data.response.forEach(match => {
            const matchDiv = document.createElement("div");
            matchDiv.classList.add("match");

            matchDiv.innerHTML = `
                <h3>${match.teams.home.name} vs ${match.teams.away.name}</h3>
                <p><strong>League:</strong> ${match.league.name}</p>
                <p><strong>Date:</strong> ${match.fixture.date}</p>
                <p><strong>Status:</strong> ${match.fixture.status.long}</p>
            `;

            predictionsContainer.appendChild(matchDiv);
        });
    } catch (error) {
        console.error("Error fetching predictions:", error);
        predictionsContainer.innerHTML = "<p>Failed to load predictions. Check console.</p>";
    }
}

getPredictions();
const apiKey = "0827e35cf4mshe75681ee2d53291p1085aajsne94482be648f";

async function getFixtures() {
    const url = "https://api-football-v1.p.rapidapi.com/v3/fixtures?next=5&league=39&season=2025"; 
    // league=39 → Premier League, change if you want other leagues
    // next=5 → show 5 upcoming matches

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
                matchDiv.classList.add("match-card");
                matchDiv.innerHTML = `
                    <p><strong>${match.teams.home.name}</strong> vs <strong>${match.teams.away.name}</strong></p>
                    <p>Date: ${match.fixture.date}</p>
                    <button onclick="getPrediction(${match.fixture.id})">Get Prediction</button>
                `;
                matchesDiv.appendChild(matchDiv);
            });
        } else {
            matchesDiv.innerHTML = "<p>No upcoming matches found.</p>";
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
