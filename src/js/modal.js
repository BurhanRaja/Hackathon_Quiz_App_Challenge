const createCont = document.querySelector(".create-user-container");
const createBtn = document.querySelector(".sign-up-btn");
const username = document.querySelector(".username");
const inp = document.querySelector(".user-form input");

const startQuizBtn = document.querySelector(".text a");

const addBtn = document.querySelector(".user-form .create-btn");
const cancelBtn = document.querySelector(".user-form .cancel-btn");

const alertCont = document.querySelector(".alert");
const alertText = document.querySelector(".alert p");

let inputUser = "";

if (localStorage.getItem("user")) {
    createBtn.classList.add("inactive")
  }

createBtn.addEventListener("click", () => {
  createCont.classList.remove("inactive");
});

inp.addEventListener("change", () => {
  inputUser = inp.value;
});

addBtn.addEventListener("click", () => {
  if (inputUser !== "") {
    createCont.classList.add("inactive");
    localStorage.setItem("user", inputUser);

    alertCont.classList.remove("inactive");
    alertText.textContent = "Invalid Credentials";
    alertCont.style.backgroundColor = "green";

    let timer = setTimeout(() => {
      alertCont.classList.add("inactive");
      clearTimeout(timer);
    }, 3000);
  } else {
    alertCont.classList.remove("inactive");
    alertText.textContent = "Invalid Credentials";
    alertCont.style.backgroundColor = "red";
    let timer = setTimeout(() => {
      alertCont.classList.add("inactive");
      clearTimeout(timer);
    }, 3000);
  }
});

cancelBtn.addEventListener("click", () => {
  createCont.classList.add("inactive");
});

startQuizBtn.addEventListener("click", () => {
  if (localStorage.getItem("user")) {
    window.location.pathname = "/quiz.html";
  } else {
    alertCont.classList.remove("inactive");
    alertText.textContent = "Please Create User";
    alertCont.style.backgroundColor = "red";

    let timer = setTimeout(() => {
      alertCont.classList.add("inactive");
      clearTimeout(timer);
    }, 3000);
  }
});
