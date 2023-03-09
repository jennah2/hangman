// Set variables
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const categories = ["Cities", "TV Shows", "Video Games"];
const words = [
  [
    "New York City",
    "Boston",
    "Los Angeles",
    "San Antonio",
    "Toronto",
    "Indianapolis",
    "San Francisco",
  ],
  [
    "Gilmore Girls",
    "Spongebob Squarepants",
    "Doctor Who",
    "The Woman in the House across the street from the girl in the window",
    "Criminal Minds",
    "Robot Chicken",
  ],
  [
    "Portal",
    "God of War",
    "Powerwash Simulator",
    "The Sims",
    "The Witcher",
    "Grand Theft Auto",
  ],
];
const stickmanParts = [
  (leftLeg = () => {
    drawPart(125, 115, 100, 110);
  }),
  (rightLeg = () => {
    drawPart(125, 135, 100, 110);
  }),
  (leftArm = () => {
    drawPart(125, 115, 90, 95);
  }),
  (rightArm = () => {
    drawPart(125, 135, 90, 95);
  }),
  (body = () => {
    drawPart(125, 125, 85, 100);
  }),
  (head = () => {
    drawHead(125, 80, 5, 0);
  }),
  (rope = () => {
    drawPart(125, 125, 50, 75);
  }),
  (beam = () => {
    drawPart(100, 150, 50, 50);
  }),
  (pole = () => {
    drawPart(100, 100, 200, 50);
  }),
  (base = () => {
    drawPart(50, 150, 200, 200);
  }),
];

// Get elements
const alphaButtons = document.querySelector(".alphabet");
const word = document.querySelector(".word");
const category = document.querySelector("#category");
const livesRemaining = document.querySelector("#lives");
const reset = document.querySelector("#resetBtn");

let correctWord = "",
  currentCategory = "",
  lives = 10,
  randomNumCat = Math.floor(Math.random() * categories.length),
  randomNumWord = Math.floor(Math.random() * categories.length),
  hiddenAnswer = "",
  canvas = document.querySelector("#stickman"),
  canvasDim = canvas.getContext("2d");

// Show alphabet
const showUI = () => {
  let output = "";
  alphabet.forEach(function (letter) {
    output += `
      <button class="btn btn-outline-info letters" value=${letter}>${letter}</button>
    `;
  });
  alphaButtons.innerHTML = output;
  livesRemaining.innerHTML = lives;
};

// Select Category and Word
const randomCatAndWord = () => {
  currentCategory = categories[randomNumCat];
  correctWord = words[randomNumCat][randomNumWord];
  answer = correctWord;
  correctWord = correctWord.replace(/\s/g, "-").toUpperCase();
  console.log(correctWord);
  category.innerHTML = currentCategory;
};

// Create phrase to guess
const createGuess = () => {
  for (let i = 0; i < correctWord.length; i++) {
    if (correctWord[i] === "-") {
      hiddenAnswer += " ";
    } else {
      hiddenAnswer += "_";
    }
  }
  word.innerHTML = hiddenAnswer;
};

// Check if guess is right/wrong
// Disables option after guess
const checkGuess = (e) => {
  if (e.target.classList.contains("letters")) {
    currentLetter = e.target.value;
    if (correctWord.includes(currentLetter)) {
      correctGuess();
    } else {
      incorrectGuess();
    }
    e.target.classList.add("btn-info");
    e.target.classList.add("disabled");
    e.target.classList.remove("btn-outline-info");
  }
  e.preventDefault();
};

// Replaces empty space with correct letter
const replaceCharacter = (currentLetter, index) => {
  hiddenAnswer =
    hiddenAnswer.substring(0, index) +
    currentLetter +
    hiddenAnswer.substring(index + 1, hiddenAnswer.length);
  word.innerHTML = hiddenAnswer;
};

// If correct guess, calls replaceCharacter
// If all spaces gone, player has won
const correctGuess = () => {
  for (let i = 0; i < correctWord.length; i++) {
    if (currentLetter === correctWord[i]) {
      replaceCharacter(currentLetter, i);
    }
  }
  if (!hiddenAnswer.includes("_")) {
    console.log(document.querySelectorAll(".letters"));
    disableAllLetters();
    let output = "You win!";
    showResult(output, "text-success");
  }
};

// If incorrect guess, lose a life
// If lives are gone, player loses
const incorrectGuess = () => {
  lives--;
  livesRemaining.innerHTML = lives;
  stickmanParts[lives]();

  if (lives <= 0) {
    disableAllLetters();
    let output = `You lose. The correct phrase was ${answer}`;
    showResult(output, "text-danger");
  }
};

// Draws hangman
const drawPart = (x1, x2, y1, y2) => {
  canvasDim.moveTo(x1, y1);
  canvasDim.lineTo(x2, y2);
  canvasDim.stroke();
};
const drawHead = (x1, x2, x3, x4) => {
  canvasDim.beginPath();
  canvasDim.arc(x1, x2, x3, x4, 2 * Math.PI);
  canvasDim.stroke();
};

// Disables all letters after game over
const disableAllLetters = () => {
  const letters = document.querySelectorAll(".letters");
  letters.forEach(function (letter) {
    letter.classList.add("disabled");
    letter.classList.add("btn-info");
    letter.classList.remove("btn-outline-info");
  });
};

// Shows end result
const showResult = (message, className) => {
  const div = document.createElement("h4");
  div.className = className;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const stickmanArea = document.querySelector(".stickman-area");
  container.insertBefore(div, stickmanArea);
};

// Initialize app
const showGame = () => {
  showUI();
  randomCatAndWord();
  createGuess();
};

showGame();

// Event listener
alphaButtons.addEventListener("click", checkGuess);
reset.addEventListener("click", function () {
  location.reload();
});
