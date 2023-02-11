import data from "../api/dataset.json";
import { createQuizOptions, getAllAnswer } from "./quiz";

const topicItem = document.querySelectorAll(".topic-item");
const topicText = document.querySelectorAll(".topic-item .topic");

const quizCont = document.querySelector(".quiz-container");
const formCont = document.querySelector(".form-container");

const startBtn = document.querySelector(".start-btn");
const navBar = document.querySelector(".navbar");
const submitBtn = document.querySelector(".submit-btn");

const question = document.querySelector(".question p");
const options = document.querySelector(".options");
const quiz = document.querySelector(".quiz");

let allAnwers = getAllAnswer(topicData);

let topic = "";
let topicData = "";
let userAnswer = [];

// To get the topic and fetch topic accordingly
for (let i = 0; i < topicItem.length; i++) {
  topicItem[i].addEventListener("click", () => {
    if (document.querySelector(".selected")) {
      let selected = document.querySelector(".selected");
      selected.classList.remove("selected");
    }
    topicItem[i].classList.add("selected");
    topic = topicText[i].textContent.toLowerCase().split(" ").join("-");
    topicData = data[topic];
  });
}

// To count the number of questions finished
let count = 0;

// To start the quiz
startBtn.addEventListener("click", () => {
  if (topic !== "") {
    formCont.classList.add("inactive");
    navBar.classList.add("inactive");

    // Create 1st Quiz
    question.textContent = topicData[count].question;
    createQuizOptions(topicData[count].options, options);
    quiz.classList.add("active");

    quizCont.classList.remove("inactive");
  }
});

// On Sumbit an answer
submitBtn.addEventListener("click", () => {
  let answer = document.querySelectorAll(".active .options .option-item input");
  count++;

  answer.forEach((ans) => {
    if (ans.checked === true) {
      userAnswer.push(ans.value);
    }
  });

  question.textContent = topicData[count].question;
  options.innerHTML = "";
  createQuizOptions(topicData[count].options, options);
});
