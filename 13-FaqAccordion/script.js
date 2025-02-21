const button = document.querySelectorAll(".toggleButton");

button.forEach((button) => {
  button.addEventListener("click", function () {
    const content = this.closest(".list").querySelector(".container-content");
    const isExpanded = this.getAttribute("aria-expanded") === "true";
    const img = this.querySelector("img");

    //Toggle clicked section
    this.classList.toggle("active");
    this.setAttribute("aria-pressed", !isExpanded);
    this.setAttribute("aria-expanded", !isExpanded);

    img.src = isExpanded ? "./images/icon-plus.svg" : "./images/icon-minus.svg";
    img.alt = isExpanded ? "Expand answer" : "Collapse answer";

    if (isExpanded) {
      content.style.maxHeight = "0";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});
