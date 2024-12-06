let string = "";
let memory = 0; // Variable to store the memory value
let buttons = document.querySelectorAll(".button");

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerHTML == "=") {
      string = eval(string);
      document.querySelector("input").value = string;
    } else if (e.target.innerHTML == "C") {
      string = "";
      document.querySelector("input").value = string;
    } else if (e.target.innerHTML == "M+") {
      memory += parseFloat(document.querySelector("input").value);
    } else if (e.target.innerHTML == "M-") {
      memory -= parseFloat(document.querySelector("input").value);
    } else if (e.target.innerHTML == "MR") {
      document.querySelector("input").value = memory;
    } else if (e.target.innerHTML == "MC") {
      memory = 0;
    } else {
      console.log(e.target);
      string = string + e.target.innerHTML;
      document.querySelector("input").value = string;
    }
  });
});
