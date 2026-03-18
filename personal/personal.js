const inputEl = document.getElementById("input-el");
const submitBtn = document.getElementById("subscribe-btn");
const messageEl = document.getElementById("message-el");
const formEl = document.getElementById("form-el");
const mainEl = document.getElementById("main-el");
const successEl = document.getElementById("success-el");
const emailEl = document.getElementById("email-el");

const pattern = /^[^]+@[^]+\.[a-z]{2,3}$/;

inputEl.addEventListener("keyup", () => {
  if (!inputEl.value.match(pattern)) {
    messageEl.textContent = "Valid email required";
    formEl.classList.add("invalid");
  } else {
    messageEl.textContent = "";
    formEl.classList.remove("invalid");
  }
});

submitBtn.addEventListener("click", () => {
  if (inputEl.value.match(pattern)) {
    mainEl.classList.remove("active");
    successEl.classList.add("active");
    emailEl.textContent = inputEl.value;
  } else {
    messageEl.textContent = "Valid email required";
    formEl.classList.add("invalid");
  }
});
