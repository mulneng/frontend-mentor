const buttons = {
  daily: document.querySelector("#button__daily"),
  weekly: document.querySelector("#button__weekly"),
  monthly: document.querySelector("#button__monthly"),
};

const cardTitle = document.querySelectorAll(".card__title");
const cardCurrent = document.querySelectorAll(".data__current");
const cardPrevious = document.querySelectorAll(".data__previous");

let selectedTimeframe = "daily";
let globalData = [];

//Update UI
const updateUI = (data) => {
  data.forEach((item, index) => {
    if (index > 5) return;

    cardTitle[index].textContent = `${item.title}`;
    cardCurrent[index].textContent = `
    ${item.timeframes[selectedTimeframe].current}hrs`;

    cardPrevious[index].textContent = `${
      selectedTimeframe === "daily"
        ? "Yesterday"
        : selectedTimeframe === "weekly"
        ? "Last Week"
        : "Last Month"
    } - ${item.timeframes[selectedTimeframe].previous}hrs`;
  });
};

//Fetch json data
const getData = async () => {
  try {
    const response = await fetch("./data.json");
    globalData = await response.json();
    console.log(globalData);
    updateUI(globalData);
  } catch (err) {
    console.log(`fetch problem: ${err.message}`);
  }
};
getData();

//Change UI when Button is clicked
const updateUIForTimeframe = (timeframe) => {
  selectedTimeframe = timeframe;
  updateUI(globalData);

  Object.values(buttons).forEach((button) => button.classList.remove("active"));
  buttons[timeframe].classList.add("active");
};

buttons.daily.addEventListener("click", () => updateUIForTimeframe("daily"));
buttons.weekly.addEventListener("click", () => updateUIForTimeframe("weekly"));
buttons.monthly.addEventListener("click", () =>
  updateUIForTimeframe("monthly")
);
