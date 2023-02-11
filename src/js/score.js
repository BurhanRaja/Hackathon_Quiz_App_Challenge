// Add Previous Score Cards

const scoreCont = document.querySelector(".scores");
let userDetails = JSON.parse(localStorage.getItem("userTrack"));

if (userDetails) {
  for (let i = 0; i < userDetails.length; i++) {
    let div = document.createElement("div");
    let topic = document.createElement("p");
    let score = document.createElement("p");

    div.style.padding = "1rem 2rem";
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";
    div.style.backgroundColor = "white";
    div.style.width = "50%";
    div.style.margin = "1rem auto";

    topic.textContent = userDetails[i].topic.toUpperCase();
    topic.style.fontWeight = "bolder";

    score.textContent = `${userDetails[i].userAnswer} / ${userDetails[i].totalScore}`;
    score.style.fontWeight = "bolder";
    score.style.fontSize = "1.1rem";

    div.appendChild(topic);
    div.appendChild(score);

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
