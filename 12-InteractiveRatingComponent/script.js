const sectionRating = document.querySelector(".rating-container");
const sectionThanks = document.querySelector(".thanks-container");
const selectedResult = document.querySelector(".selectedResult");
const ratingButtons = document.querySelectorAll(".button-rate");
const submitButton = document.querySelector("#submitButton");

let rating = null;

const removeActiveClass = () => {
  ratingButtons.forEach((btn) => btn.classList.remove("active"));
};

const handleRate = () => {
  ratingButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      removeActiveClass();
      e.target.classList.add("active");
      rating = e.target.dataset.rate;
    });
  });
};
handleRate();

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  sectionRating.classList.add("hidden");
  sectionThanks.classList.remove("hidden");
  selectedResult.innerText = `You selected ${rating} out of 5`;
});
