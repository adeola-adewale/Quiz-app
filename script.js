// 1. Data (Quiz Questions) object: key/value
const questions = [
  {
    question: "On which date is World Environment Day celebrated globally every year?",
    options: ["June 5", "May 1", "October 1", "December 25"],
    answer: 0 // index of your correct answer
  },
  {
    question: "What should you do with your household waste?",
    options: [
      "Throw it in the river",
      "Burn it anywhere",
      "Dispose of it in a proper waste bin or collection point",
      "Leave it on the roadside"
    ],
    answer: 2 // index of your correct answer
  },
  {
    question: "Which of these helps keep the environment clean?",
    options: [
      "Littering",
      "Dumping waste in drains",
      "Using waste bins and recycling where possible",
      "Burning plastic"
    ],
    answer: 2 // index of your correct answer
  },
  {
    question: "What is the main purpose of planting trees?",
    options: [
      "To make roads narrower",
      "To improve air quality and reduce erosion",
      "To increase flooding",
      "To create more waste"
    ],
    answer: 1 // index of your correct answer
  },
  {
    question: "Which of the following is a safe source of drinking water?",
    options: [
      "Water from a dirty stream",
      "Treated or clean borehole water",
      "Rainwater collected from a dirty roof",
      "Water from a stagnant pond"
    ],
    answer: 1 // index of your correct answer
  },
  {
    question: "What should you do if a project is causing problems in your community?",
    options: [
      "Ignore it",
      "Spread rumours",
      "Report the issue through the project's grievance mechanism or community representative",
      "Damage project property"
    ],
    answer: 2 // index of your correct answer
  },
  {
    question: "Which major river in Nigeria is most prone to seasonal flooding affecting communities along its banks?",
    options: ["River Niger", "Ogun River", "Amazon River", "Nile River"],
    answer: 0 // index of your correct answer
  }
];

// 2. State Variables
let currentQuestionIndex = 0;
let score = 0;

// 3. DOM elements
const quizbody = document.getElementById("quiz-body");
const resultScreen = document.getElementById("result-screen");
const questionTitle = document.getElementById("question-title");
const optionsContainer = document.getElementById("options-container");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

// 4. Functions
function loadQuestions () {
  const currentQ = questions[currentQuestionIndex];

  // update Progress
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

  // Render Title
  questionTitle.textContent = currentQ.question;

  // clear previous option buttons
  optionsContainer.innerHTML = "";

  // render options Buttos dynamically
  currentQ.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.textContent = optionText;
    button.addEventListener("click", () => selectOption(index, button));
    optionsContainer.appendChild(button);
  });
}

function selectOption(selectedIndex, selectedBtn) {
  const currentQ = questions[currentQuestionIndex];
  const buttons = optionsContainer.querySelectorAll(".option-btn");

  // disables all buttons once an option is picked
  buttons.forEach(btn => btn.disabled = true);

  // check answer
  if (selectedIndex === currentQ.answer) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
    // show correct answer to user
    buttons[currentQ.answer].classList.add("correct");
  }

  // delay before going to the next question
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestions();
    } else {
      showResults();
    }
  }, 1200);
}

function showResults () {
  quizbody.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreText.textContent = `You score ${score} out of ${questions.length}!`;
}

const restartQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  resultScreen.classList.add("hidden");
  quizbody.classList.remove("hidden");
  loadQuestions();
};

// 5. Event Listener
restartBtn.addEventListener('click', restartQuiz);

// Initial start
loadQuestions();