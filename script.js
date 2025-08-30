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
