let currentDisplay = ""; // Initialize currentDisplay to an empty string

const display = document.querySelector("#display");
const recentDisplay = document.querySelector("#recent-display");
const buttons = document.querySelectorAll(".Calc-btn");

//Display the Most Recent Entered Number
function showRecentNumber() {
  const entries = currentDisplay.trim().split(" ");
  const recentNumber = entries[entries.length - 1] || "";
  recentDisplay.value = currentDisplay; // mini display shows full expression
  display.value = recentNumber; // main display shows last number
}

// Function to append value to display
function appendToDisplay(value) {
  currentDisplay += value;
  display.value = currentDisplay;
  showRecentNumber();
}
// Function to clear the display
function clearDisplay() {
  currentDisplay = "";
  display.value = currentDisplay;
  showRecentNumber();
}
// Function to clear the last entry
function clearEntry() {
  const entries = currentDisplay.trim().split(" ");
  entries.pop(); // Remove the last entry
  currentDisplay = entries.join(" ");
  display.value = currentDisplay;
  showRecentNumber();
}
// Function to evaluate the display
function evaluateDisplay() {
  try {
    const result = eval(currentDisplay);
    recentDisplay.value = currentDisplay;
    display.value = result;
    currentDisplay = "";
  } catch (error) {
    currentDisplay = "Error";
    currentDisplay = "";
  }
}
// Function to handle backspace
function backspaceDisplay() {
  currentDisplay = currentDisplay.slice(0, -1);
  display.value = currentDisplay;
  showRecentNumber();
}

// Add event listeners to buttons (Its like Looping through each button)
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    if (value === "C") {
      clearDisplay();
    } else if (value === "CE") {
      clearEntry();
    } else if (value === "⌫") {
      backspaceDisplay();
    } else if (value === "=") {
      evaluateDisplay();
    } else {
      appendToDisplay(value);
    }
  });
});

//keyboard support
document.addEventListener("keydown", function (event) {
  const key = event.key; // Get the key pressed
  if (!isNaN(key)) {
    appendToDisplay(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    appendToDisplay(` ${key} `);
  } else if (key === "Enter") {
    evaluateDisplay();
  } else if (key === "Backspace") {
    event.preventDefault(); // Prevent default backspace behavior
    backspaceDisplay();
  } else if (key === "Escape") {
    clearDisplay();
  } else if (key === ".") {
    appendToDisplay(".");
  }
});
