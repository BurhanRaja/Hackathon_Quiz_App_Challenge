import data from "../api/dataset.json";
import { createQuizOptions, getAllAnswer } from "./quiz";

const navBar = document.querySelector(".navbar");

// Quiz Container
const quizCont = document.querySelector(".quiz-container");

// Form Container
const formCont = document.querySelector(".form-container");

// Topic Section
const topicItem = document.querySelectorAll(".topic-item");
const topicText = document.querySelectorAll(".topic-item .topic");

const startBtn = document.querySelector(".start-btn");
const submitBtn = document.querySelector(".submit-btn");
const quitBtn = document.querySelector(".quit-btn button");

// Quiz
const quizTopic = document.querySelector(".topic-title");
const question = document.querySelector(".question p");
const options = document.querySelector(".options");
const quiz = document.querySelector(".quiz");
const timing = document.querySelector(".time");

// End
const message = document.querySelector(".end-message .message");
const finalResult = document.querySelector(".final-result");
const endCont = document.querySelector(".end-message");
const resultBtn = document.querySelector(".result-btn");

const username = document.querySelector(".username");

if (localStorage.getItem("user")) {
  username.textContent = localStorage.getItem("user");
}

let topic = "";
let topicData = "";
let userAnswer = [];
let allAnwers = [];
let timer;
let timeCounter = 15;

// To get the topic and fetch topic accordingly
for (let i = 0; i < topicItem.length; i++) {
  topicItem[i].addEventListener("click", () => {
    if (document.querySelector(".selected")) {
      let selected = document.querySelector(".selected");
      selected.classList.remove("selected");
    }
    topicItem[i].classList.add("selected");
    quizTopic.textContent = topicItem[i].textContent + " Quiz";
    quizTopic.style.color = "white";

    topic = topicText[i].textContent.toLowerCase().split(" ").join("-");

    if (topic === "coding") {
      quizCont.style.backgroundColor = "#ffb703";
    }
    if (topic === "modern-art") {
      quizCont.style.backgroundColor = "#023047";
    }
    if (topic === "music") {
      quizCont.style.backgroundColor = "#219ebc";
    }

    topicData = data[topic];
    allAnwers = getAllAnswer(topicData);
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

    timer = setInterval(() => {
      if (timeCounter === 0) {
        question.textContent = "";
        options.innerHTML = "";
        submitBtn.classList.add("inactive");
        quitBtn.classList.add("inactive");
        endCont.classList.remove("inactive");
        message.textContent = "Oh! You went out of Time. Please Try Again.";
        clearInterval(timer);
      }

      timing.textContent = timeCounter--;
    }, 1000);
  }
});

// On Sumbit an answer
submitBtn.addEventListener("click", () => {
  let answer = document.querySelectorAll(".active .options .option-item input");
  let flag = false;
  answer.forEach((ans) => {
    if (ans.checked === true) {
      userAnswer.push(ans.value);
      flag = true;
    }
  });

  if (!flag) {
    return -1;
  }

  // Check if the questions are finished
  if (count + 1 === topicData.length) {
    question.textContent = "";
    options.innerHTML = "";
    submitBtn.classList.add("inactive");
    quitBtn.classList.add("inactive");
    endCont.classList.remove("inactive");
    message.textContent = "Well Done! You answered All the Questions.";
    clearInterval(timer);
    timeCounter = 0;
  } else {
    clearInterval(timer);

    count++;

    question.textContent = topicData[count].question;
    options.innerHTML = "";
    createQuizOptions(topicData[count].options, options);
    timeCounter = 15;

    timer = setInterval(() => {
      if (timeCounter === 0) {
        question.textContent = "";
        options.innerHTML = "";
        submitBtn.classList.add("inactive");
        quitBtn.classList.add("inactive");
        endCont.classList.remove("inactive");
        message.textContent = "Oh! You went out of Time. Please Try Again.";
        clearInterval(timer);
      }
      timing.textContent = timeCounter--;
    }, 1000);
  }
});

// Get Results
resultBtn.addEventListener("click", () => {
  let rightAnswerCount = 0;
  let ansArr = [];
  timing.textContent = 0;

  userAnswer.forEach((el, index) => {
    if (el === allAnwers[index]) {
      rightAnswerCount++;
      ansArr.push(true);
    } else {
      ansArr.push(false);
    }
  });

  finalResult.textContent = `${rightAnswerCount} out of ${allAnwers.length}`;
  finalResult.style.color = "green";

  let userStorage = JSON.parse(localStorage.getItem("userTrack"));

  if (userStorage) {
    localStorage.removeItem("userTrack");
    localStorage.setItem(
      "userTrack",
      JSON.stringify([
        {
          topic: topic,
          userAnswer: rightAnswerCount,
          totalScore: allAnwers.length,
        },
        ...userStorage,
      ])
    );
  } else {
    localStorage.setItem(
      "userTrack",
      JSON.stringify([
        {
          topic: topic,
          userAnswer: rightAnswerCount,
          totalScore: allAnwers.length,
        },
      ])
    );
  }
});
