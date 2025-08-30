function predict(match, id) {
  const outcomes = [
    "Home Win ✅",
    "Away Win 🏆",
    "Draw 🤝",
    "Over 2.5 Goals ⚡",
    "Both Teams To Score 🔥"
  ];

  const result = outcomes[Math.floor(Math.random() * outcomes.length)];
  document.getElementById(id).innerText = `${match} → ${result}`;
}

