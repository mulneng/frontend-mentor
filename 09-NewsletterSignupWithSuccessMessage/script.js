const emailInput = document.querySelector("#email");
const errorMessage = document.querySelector(".error-message-container");
const form = document.querySelector(".form__section");
const submitButton = document.querySelector("#submit");
const dismissButton = document.querySelector("#dismiss");
const mainSection = document.querySelector(".main__form");
const successSection = document.querySelector(".main__success-state");

//Email validation function

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleValidation = () => {
  const isValid = isValidEmail(emailInput.value);
  errorMessage.style.display = isValid ? "none" : "block";
  isValid
    ? emailInput.classList.remove("form__mail--invalid")
    : emailInput.classList.add("form__mail--invalid");
  return isValid;
};

emailInput.addEventListener("input", handleValidation);

//Submit button
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (handleValidation()) {
    mainSection.style.display = "none";
    successSection.style.display = "block";
  } else {
    emailInput.classList.add("form__mail--invalid");
  }
});

//Dismiss button
dismissButton.addEventListener("click", () => {
  mainSection.style.display = "flex";
  successSection.style.display = "none";
});
