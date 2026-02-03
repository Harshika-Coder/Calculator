let currentDisplay = ""; // Initialize currentDisplay to an empty string

const display = document.querySelector("#display");
const recentDisplay = document.querySelector("#recent-display");
const buttons = document.querySelectorAll(".Calc-btn");
const historySection = document.querySelector("#history-section");
const clearHistory = document.querySelector("#clear-history");

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
  showRecentNumber();
}
// Function to clear the display
function clearDisplay() {
  currentDisplay = "";
  display.value = ""; // Clear main display
  recentDisplay.value = ""; // Clear recent display
}
// Function to clear the last entry
function clearEntry() {
  display.value = "";
}
// Function to evaluate the display
function evaluateDisplay() {
  try {
    const expression = currentDisplay;
    const result = eval(expression);

    recentDisplay.value = expression + " =";
    display.value = result;
    // Save the calculation to the server
    saveCalculation(expression, result);

    // clear currentDisplay after evaluation
    currentDisplay = "";
  } catch (error) {
    currentDisplay = "Error";
    currentDisplay = "";
  }
}
// Function to handle backspace
function backspaceDisplay() {
  currentDisplay = currentDisplay.slice(0, -1);
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
  } else if (key.toUpperCase() === "C") {
    clearDisplay();
  } else if (key.toUpperCase() === "E") {
    clearEntry();
  } else if (key === ".") {
    appendToDisplay(".");
  }
});

// Function to save calculation to server
async function saveCalculation(expression, result) {
  try {
    const response = await fetch("http://localhost:3000/api/calculations", {
<<<<<<< HEAD
      method: "POST", //request method
=======
      method: "POST",
>>>>>>> 702826dc105af3babf3e74931691179472f52189
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expression, result }),
    });
    if (response.ok) {
      fetchHistory(); // Refresh history after saving
    } else {
      const errorData = await response.text();
      throw new Error(errorData || "Failed to save calculation");
    }
  } catch (error) {
    alert("Error saving calculation: " + error.message);
  }
}

// Function to fetch history from server
async function fetchHistory() {
  historySection.innerHTML = "Loading...";
  try {
    const response = await fetch("http://localhost:3000/api/calculations");
    const history = await response.json();

    // Display history in history section
    if (!Array.isArray(history) || history.length === 0) {
      historySection.innerHTML = "No previous calculations.";
      return;
    }
    historySection.innerHTML = history
      .map((calc) => `<p>${calc.expression} = ${calc.result}</p>`)
      .join("");
  } catch (error) {
    historySection.innerHTML = "Failed to load history";
    console.error("Error fetching history:", error);
  }
}

// Clear history
clearHistory.addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3000/api/calculations", {
<<<<<<< HEAD
      method: "DELETE", //request method
=======
      method: "DELETE",
>>>>>>> 702826dc105af3babf3e74931691179472f52189
    });
    if (response.ok) {
      historySection.innerHTML = "No previous calculations.";
      clearDisplay();
    }
  } catch (error) {
    alert("Failed to clear history");
    console.error("Error clearing history:", error);
  }
});

// Fetch history on page load
document.addEventListener("DOMContentLoaded", fetchHistory);
