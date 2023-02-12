// Username
const username = document.querySelector(".username");

// Alert
const alertCont = document.querySelector(".alert");
const alertText = document.querySelector(".alert p");


// Create user
const createCont = document.querySelector(".create-user-container");
const createBtn = document.querySelector(".sign-up-btn");
const inp = document.querySelector(".user-form input");

const startQuizBtn = document.querySelector(".text a");

const addBtn = document.querySelector(".user-form .create-btn");
const cancelBtn = document.querySelector(".user-form .cancel-btn");

if (localStorage.getItem("user")) {
  username.textContent = localStorage.getItem("user");
  createBtn.classList.add("inactive");
}

let inputUser = "";

  // Open modal
createBtn.addEventListener("click", () => {
  createCont.classList.remove("inactive");
});

// Input
inp.addEventListener("change", () => {
  inputUser = inp.value;
});

// Create User
addBtn.addEventListener("click", () => {
  if (inputUser !== "") {
    createCont.classList.add("inactive");
    localStorage.setItem("user", inputUser);

    alertCont.classList.remove("inactive");
    alertText.textContent = "User Created Successfully!";
    alertCont.style.backgroundColor = "green";

    createBtn.classList.add("inactive");
    username.textContent = inputUser;

    let timer = setTimeout(() => {
      alertCont.classList.add("inactive");
      clearTimeout(timer);
    }, 3000);
  } else {
    alertCont.classList.remove("inactive");
    alertText.textContent = "Invalid Credentials!";
    alertCont.style.backgroundColor = "red";
    let timer = setTimeout(() => {
      alertCont.classList.add("inactive");
      clearTimeout(timer);
    }, 3000);
  }
});

startQuizBtn.addEventListener("click", () => {
  if (localStorage.getItem("user")) {
    window.location.pathname = "/quiz.html";
  } else {
    alertCont.classList.remove("inactive");
    alertText.textContent = "Please create a user";
    alertCont.style.backgroundColor = "red";
    let timer = setTimeout(() => {
      alertCont.classList.add("inactive");
      clearTimeout(timer);
    }, 3000);
  }
})

// Hide Modal
cancelBtn.addEventListener("click", () => {
  createCont.classList.add("inactive");
});
