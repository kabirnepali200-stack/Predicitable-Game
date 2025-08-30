"X-RapidAPI-Key": "0827e35cf4mshe75681ee2d53291p1085aasjne94482be648f",
async function getPrediction(fixtureId, divId) {
  const url = `https://api-football-v1.p.rapidapi.com/v3/predictions?fixture=${fixtureId}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0827e35cf4mshe75681ee2d53291p1085aajsne94482be648f", 
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const prediction = data.response[0].predictions.winner?.name || "No prediction available";
    document.getElementById(divId).innerHTML = "Predicted Winner: " + prediction;
  } catch (error) {
    console.error(error);
  }
}
// ✅ Replace with your API Key
const API_KEY = "0827e35cf4mshe75681ee2d53291p1085aajsne94482be648f";

async function getPrediction(fixtureId, divId) {
  const url = `https://api-football-v1.p.rapidapi.com/v3/predictions?fixture=${fixtureId}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const prediction = data.response[0]?.predictions?.winner?.name || "No prediction available";
    document.getElementById(divId).innerHTML = "Predicted Winner: " + prediction;
  } catch (error) {
    console.error(error);
  }
}


// Load matches automatically when page opens
loadMatches();
