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
