// Getting all the correct anwers
export function getAllAnswer(data) {
  let answers = [];
  data.forEach((el) => {
    answers.push(el.answer);
  });

  return answers;
}

// Create Quiz Component
export function createQuizOptions(options, optionCont) {
  for (let i = 0; i < options.length; i++) {
    let optItem = document.createElement("div");
    let inp = document.createElement("input");
    let label = document.createElement("label");

    optItem.classList.add("option-item");

    inp.name = "answer";
    inp.type = "radio";
    inp.id = options[i];
    inp.value = options[i];

    label.textContent = options[i];
    label.setAttribute("for", options[i]);

    optItem.appendChild(inp);
    optItem.appendChild(label);

    optionCont.appendChild(optItem);
  }
}

// To Shuffle Questions
export function shuffleQuestions(questionsArr) {
  let randomQuestion = [];
  for (let i = 0; i < questionsArr.length; i++) {
    let random = Math.floor(Math.random() * questionsArr.length);
    if (randomQuestion.includes(questionsArr[random])) {
      return shuffleQuestions(questionsArr);
    } else {
      randomQuestion.push(questionsArr[random]);
    }
  }
  return randomQuestion;
}

// To Shuffle Options
export function shuffleOptions(optionsArr) {
  let randomOption = [];
  for (let i = 0; i < optionsArr.length; i++) {
    let random = Math.floor(Math.random() * optionsArr.length);
    if (randomOption.includes(optionsArr[random])) {
      return shuffleOptions(optionsArr);
    } else {
      randomOption.push(optionsArr[random]);
    }
  }
  return randomOption;
}
