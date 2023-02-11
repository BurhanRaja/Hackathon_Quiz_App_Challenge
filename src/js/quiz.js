export function getAllAnswer(data) {
  let answers = [];
  data.forEach((el) => {
    answers.push(el.answer);
  });

  return answers;
}

export function createQuizOptions(options, optionCont) {
  for (let i = 0; i < options.length; i++) {

    let optItem = document.createElement("div");
    let inp = document.createElement("input");
    let label = document.createElement("label");

    optItem.classList.add("option-item");

    inp.name = "answer";
    inp.type = "radio"
    inp.id = options[i];
    inp.value = options[i];

    label.textContent = options[i];
    label.setAttribute("for", options[i]);
    
    optItem.appendChild(inp);
    optItem.appendChild(label);

    optionCont.appendChild(optItem);
  }
}
