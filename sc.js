const questions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "Mumbai", correct: false },
      { text: "Delhi", correct: true },
      { text: "Kolkata", correct: false },
      { text: "Chennai", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: false }
    ]
  },
  {
    question: "HTML stands for?",
    answers: [
      { text: "Hyper Type Multi Language", correct: false },
      { text: "HyperText Markup Language", correct: true },
      { text: "HighText Marking Language", correct: false },
      { text: "Hyperlinking Text Module Language", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  resultContainer.classList.add("hide");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) score++;

  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "#16a34a";
    } else {
      button.style.backgroundColor = "#dc2626";
    }
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerText = `Quiz Completed!`;
  resultContainer.innerText = `Your Score: ${score} / ${questions.length}`;
  resultContainer.classList.remove("hide");
  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
  nextButton.onclick = startQuiz;
}

startQuiz();
