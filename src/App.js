import React, { useState, useEffect } from 'react';
import './App.css';

//object containing the operators and their arrow functions
const OPERATORS = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '×': (x, y) => x * y,
  '÷': (x, y) => x / y
};

// this function generates the math problem
function generateProblem() {
  const operator = getRandomOperator();
  let operand1, operand2;

  if (operator === '×') {
    operand1 = getRandomNumber(1, 12);
    operand2 = getRandomNumber(1, 12);
  } else if (operator === '÷') {
    operand2 = getRandomNumber(1, 12);
    operand1 = operand2 * getRandomNumber(1, 12);
  } else {
    operand1 = getRandomNumber(1, 50);
    operand2 = getRandomNumber(1, 50);
  }
  return { operand1, operator, operand2 };
}

//function gets a random operator
function getRandomOperator() {
  const operators = Object.keys(OPERATORS);
  const randomIndex = Math.floor(Math.random() * operators.length);
  return operators[randomIndex];
}

//this function gets random numbers within the range specified
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [problem, setProblem] = useState(generateProblem());
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(1);
  const totalProblems = 10;
  const [showFinalScore, setShowFinalScore] = useState(false);

  useEffect(() => {
    if (currentProblem > totalProblems) {
      setShowFinalScore(true);
    }
  }, [currentProblem]);

  //function validate the answer given
  const validateAnswer = () => {
    const { operand1, operator, operand2 } = problem;
    const correctAnswer = OPERATORS[operator](operand1, operand2);

    if (isNaN(parseFloat(answer))) {
      // Handles where the answer given is not a number
      alert('Invalid answer. Please enter a number.');
      return;
    }

    if (parseFloat(answer) === correctAnswer) {
      setScore(score + 1);
      alert('Correct!');
    } else {
      alert(`Wrong! The correct answer is ${correctAnswer}`);
    }
    setAnswer('');
    setCurrentProblem(currentProblem + 1);
    if (currentProblem === totalProblems) {
      // Display final score
        setShowFinalScore(true);
    } else {
      setProblem(generateProblem());
    }
  };
//function to restart quizz
  const restartQuiz = () => {
    setProblem(generateProblem());
    setScore(0);
    setCurrentProblem(1);
    setShowFinalScore(false);
  };

  return (
    <div className="App">
      <h1>Arithmetic Drills</h1>
      {showFinalScore ? (
        <h2>Final Score: {score}/{totalProblems}</h2>
      ) : (
        <h2>Problem {currentProblem} / {totalProblems}</h2>
      )}
      {showFinalScore ? (
        <>
          <p>Quiz Completed!</p>
          <button id='restartBtn' onClick={restartQuiz}>Restart Quiz</button>
        </>
      ) : (
        <>
          <p>{problem.operand1} {problem.operator} {problem.operand2} =</p>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <br></br>
          <br></br>
          <button onClick={validateAnswer}>Submit</button>
        </>
      )}
    </div>
  );
}

export default App;
