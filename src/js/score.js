// Add Previous Score Cards

const scoreCont = document.querySelector(".scores");
let userDetails = JSON.parse(localStorage.getItem("userTrack"));

if (userDetails) {
  for (let i = 0; i < userDetails.length; i++) {
    let div = document.createElement("div");
    let topic = document.createElement("p");
    let score = document.createElement("p");
    let date = document.createElement("p");

    div.setAttribute("class", "score-container");

    topic.textContent = userDetails[i].topic.toUpperCase();
    topic.style.fontWeight = "bolder";

    score.textContent = `${userDetails[i].userAnswer} / ${userDetails[i].totalScore}`;
    score.style.fontWeight = "bolder";
    score.style.fontSize = "1.1rem";

    date.textContent = userDetails[i].date;

    div.appendChild(topic);
    div.appendChild(score);
    div.appendChild(date);

    scoreCont.appendChild(div);
  }
} else {
  let div = document.createElement("div");

  div.style.padding = "1.5rem";
  div.style.display = "flex";
  div.style.justifyContent = "center";
  div.style.alignItems = "center";

  div.textContent = "No Score to Display";

  scoreCont.appendChild(div);
}
