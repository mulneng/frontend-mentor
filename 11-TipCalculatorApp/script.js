const billInput = document.querySelector("#input__bill");
const peopleInput = document.querySelector("#input__people");
const tipButtons = document.querySelectorAll(".tip__button");
const tipCustom = document.querySelector("#tip__custom");

const resultTotal = document.querySelector("#tip__total");
const resultTip = document.querySelector("#tip__amount");
const resetButton = document.querySelector("#button__reset");

let selectedTip = null;
resetButton.disabled = true;

//Check if number is positive
const isPositiveNumber = (value) => {
  const num = Number(value);
  return !Number.isNaN(num) && num > 0 ? num : null;
};

//Validation functions
const validateInputs = {
  bill: (input) => isPositiveNumber(input.value),
  people: (input) =>
    Number.isInteger(isPositiveNumber(input.value))
      ? Number(input.value)
      : null,
  tip: (input) =>
    isPositiveNumber(input.value) ? Number(input.value) / 100 : null,
};

//Apply error styles dynamically
const handleErrorStyles = (inputElement, validator) => {
  inputElement.addEventListener("input", () => {
    inputElement.classList.toggle("error", !validator(inputElement));
  });

  inputElement.addEventListener("blur", () => {
    if (!inputElement.value.trim()) {
      inputElement.classList.remove("error");
    }
  });
};

//Attach error handling to inputs
Object.entries({
  bill: billInput,
  people: peopleInput,
  tip: tipCustom,
}).forEach(([key, input]) => handleErrorStyles(input, validateInputs[key]));

//Select Tip Percentage
const handleTipSelection = () => {
  tipButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      tipButtons.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      selectedTip = Number(e.target.dataset.percent) / 100;
      tipCustom.value = "";
      updateResults();
    });
  });
};

handleTipSelection();

//Update the displayed results
const updateResults = () => {
  const bill = validateInputs.bill(billInput);
  const people = validateInputs.people(peopleInput);

  if (bill && people && selectedTip !== null) {
    const tipAmount = (bill * selectedTip) / people;
    const tipTotal = bill / people + tipAmount;

    resultTip.textContent = `$${tipAmount.toFixed(2)}`;
    resultTotal.textContent = `$${tipTotal.toFixed(2)}`;
    resetButton.disabled = false;
    resetButton.classList.toggle("disabled");
  } else {
    resultTip.textContent = "0.00";
    resultTotal.textContent = "0.00";
  }
};

//Reset everything
const resetForm = () => {
  billInput.value = "";
  peopleInput.value = "";
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  tipCustom.value = "";
  resultTip.textContent = "0.00";
  resultTotal.textContent = "0.00";
  resetButton.disabled = true;
  resetButton.classList.toggle("disabled");
};

//Event listeners
[billInput, peopleInput].forEach((input) =>
  input.addEventListener("input", updateResults)
);
tipCustom.addEventListener("input", () => {
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  selectedTip = validateInputs.tip(tipCustom);
  updateResults();
});

resetButton.addEventListener("click", resetForm);
