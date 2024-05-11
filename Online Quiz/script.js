//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 16;
let countdown;

//Questions and Options array

const quizArray = [
 
  {
      question: "Which method is used to convert a string to uppercase in JavaScript?",
      options: ["toUpperCase()", "toUpper()", "upperCase()", "makeUppercase()"],
      correctAnswer: "toUpperCase()"
  },
  {
      question: "What is the correct way to declare a function in JavaScript?",
      options: ["function myFunction() {}", "myFunction() {}", "def myFunction() {}", "declare function myFunction() {}"],
      correctAnswer: "function myFunction() {}"
  },
  {
      question: "Which keyword is used to define a block of code in JavaScript?",
      options: ["block", "section", "blocker", "{} // curly braces"],
      correctAnswer: "{} // curly braces"
  },
  {
      question: "How do you check the length of an array in JavaScript?",
      options: ["array.size()", "array.length", "lengthOf(array)", "sizeOf(array)"],
      correctAnswer: "array.length"
  },
  {
      question: "What is the correct way to compare two variables in JavaScript without considering their type?",
      options: ["equals()", "compare()", "==", "==="],
      correctAnswer: "=="
  },
  {
      question: "Which method is used to remove the first element from an array in JavaScript?",
      options: ["removeFirst()", "shift()", "remove(0)", "popFirst()"],
      correctAnswer: "shift()"
  },
  {
      question: "What does the parseInt() function do in JavaScript?",
      options: ["Parses a string and returns a floating-point number", "Parses a string and returns an integer", "Parses a string and returns a boolean value", "Parses a string and returns the first character"],
      correctAnswer: "Parses a string and returns an integer"
  },
  {
      question: "What is the result of typeof(undefined) in JavaScript?",
      options: ["'null'", "'undefined'", "'object'", "'string'"],
      correctAnswer: "'undefined'"
  },
  {
      question: "How do you declare a two-dimensional array in JavaScript?",
      options: ["var arr = [[]]", "var arr = new Array(2, 2)", "var arr = [[], []]", "var arr = [][2]"],
      correctAnswer: "var arr = [[], []]"
  },
  {
      question: "Which method is used to add elements to the beginning of an array in JavaScript?",
      options: ["push()", "unshift()", "append()", "prepend()"],
      correctAnswer: "unshift()"
  }




];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 16;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 16;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
