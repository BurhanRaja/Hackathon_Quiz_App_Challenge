import data from "../api/dataset.json";
import {
  createQuizOptions,
  getAllAnswer,
  shuffleOptions,
  shuffleQuestions,
} from "./quiz";


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
const playAgainBtn = document.querySelector(".play-again-btn");

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

let username = document.querySelector(".username");

// Alert
const alertCont = document.querySelector(".alert");
const alertText = document.querySelector(".alert p");

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
function initializeQuiz() {
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
      topicData = shuffleQuestions(topicData);
      allAnwers = getAllAnswer(topicData);
    });
  }
}

function startQuiz() {
  if (topic !== "") {
    formCont.classList.add("inactive");
    navBar.classList.add("inactive");

    // Create 1st question
    question.textContent = topicData[count].question;
    let sOptions = shuffleOptions(topicData[count].options);
    createQuizOptions(sOptions, options);
    quiz.classList.add("active");

    quizCont.classList.remove("inactive");

    // Time limit to answer one question
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
  } else {
    alertCont.classList.remove("inactive");

    // Alert
    alertText.textContent = "Please Select a Topic";
    alertCont.style.backgroundColor = "red";
    let timer = setTimeout(() => {
      alertCont.classList.add("inactive");
      clearTimeout(timer);
    }, 3000);
  }
}

initializeQuiz();

// To count the number of questions finished
let count = 0;

// To start the quiz
startBtn.addEventListener("click", () => {
  console.log("hello");
  startQuiz();
});

// On Sumbit an answer
submitBtn.addEventListener("click", () => {
  // Check if an option is selected
  let answer = document.querySelectorAll(".active .options .option-item input");
  let flag = false;
  answer.forEach((ans) => {
    if (ans.checked === true) {
      userAnswer.push(ans.value);
      flag = true;
    }
  });

  if (!flag) {
    alertCont.classList.remove("inactive");

    // Alert
    alertText.textContent = "Please Select an Option";
    alertCont.style.backgroundColor = "red";
    let timer = setTimeout(() => {
      alertCont.classList.add("inactive");
      clearTimeout(timer);
    }, 3000);
  } else {
    // Check if the questions are finished
    if (count + 1 === topicData.length) {
      question.textContent = "";
      options.innerHTML = "";
      submitBtn.classList.add("inactive");
      quitBtn.classList.add("inactive");
      endCont.classList.remove("inactive");
      message.textContent = "Well Done! You answered All the Questions.";
      clearInterval(timer);
      timing.textContent = 0;
    } else {
      clearInterval(timer);

      count++;

      // Add Question and Option
      question.textContent = topicData[count].question;
      options.innerHTML = "";
      let sOptions = shuffleOptions(topicData[count].options);
      createQuizOptions(sOptions, options);
      timeCounter = 15;

      // Time limit to answer one question
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
          date: new Date().toLocaleString(),
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
          date: new Date().toLocaleString(),
        },
      ])
    );
  }
});

// Play Agian
playAgainBtn.addEventListener("click", () => {
  count = 0;
  timeCounter = 15;
  userAnswer = [];
  submitBtn.classList.remove("inactive");
  quitBtn.classList.remove("inactive");
  endCont.classList.add("inactive");
  finalResult.textContent = "";
  message.textContent = "";
  initializeQuiz();
  startQuiz();
});

