const questions = [
    {
      question: "What is the main goal of SDG 13: Climate Action?",
      options: [
        "Promote fossil fuel use",
        "Take urgent action to combat climate change and its impacts",
        "Increase plastic production",
        "Reduce renewable energy investments"
      ],
      correct: 1
    },
    {
      question: "Which sector is the largest contributor to greenhouse gas emissions?",
      options: [
        "Agriculture",
        "Energy Production",
        "Transportation",
        "Industrial Manufacturing"
      ],
      correct: 1
    },
    {
      question: "What does the Paris Agreement aim to do?",
      options: [
        "Limit global temperature rise to well below 2°C",
        "Increase coal mining",
        "Promote deforestation",
        "Reduce climate research funding"
      ],
      correct: 0
    },
    {
      question: "Which of these is a renewable energy source?",
      options: [
        "Coal",
        "Natural Gas",
        "Solar Power",
        "Nuclear Energy"
      ],
      correct: 2
    },
    {
      question: "What is carbon footprint a measure of?",
      options: [
        "Oxygen consumption",
        "Total greenhouse gas emissions caused by an individual/organization",
        "Number of trees in an area",
        "Water pollution levels"
      ],
      correct: 1
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let userAnswers = new Array(questions.length);
  
  function initializeQuiz() {
    showQuestion(currentQuestion);
    document.getElementById('prev-btn').addEventListener('click', previousQuestion);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
  }
  
  function showQuestion(index) {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    
    questionContainer.innerHTML = `<p>${index + 1}. ${questions[index].question}</p>`;
    optionsContainer.innerHTML = '';
  
    questions[index].options.forEach((option, i) => {
      const button = document.createElement('button');
      button.className = `option-btn ${userAnswers[index] === i ? 'selected' : ''}`;
      button.innerHTML = option;
      button.onclick = () => selectAnswer(i);
      optionsContainer.appendChild(button);
    });
  
    updateNavigation();
  }
  
  function selectAnswer(optionIndex) {
    const options = document.querySelectorAll('.option-btn');
    options.forEach(option => option.classList.remove('selected'));
    
    options[optionIndex].classList.add('selected');
    userAnswers[currentQuestion] = optionIndex;
    
    if (optionIndex === questions[currentQuestion].correct) {
      options[optionIndex].classList.add('correct');
    } else {
      options[optionIndex].classList.add('incorrect');
    }
  }
  
  function updateNavigation() {
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    document.getElementById('next-btn').innerHTML = 
      currentQuestion === questions.length - 1 ? 'Submit' : 'Next';
  }
  
  function previousQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
    }
  }
  
  function nextQuestion() {
    if (userAnswers[currentQuestion] === undefined) {
      alert('Please select an answer before proceeding!');
      return;
    }
  
    if (currentQuestion === questions.length - 1) {
      calculateScore();
      return;
    }
  
    currentQuestion++;
    showQuestion(currentQuestion);
  }
  
  function calculateScore() {
    score = userAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correct ? 1 : 0);
    }, 0);
  
    const scoreContainer = document.getElementById('score-container');
    scoreContainer.innerHTML = `
      <h3>Quiz Complete!</h3>
      <p>Your score: ${score}/${questions.length}</p>
      <p>${score >= 4 ? 'Great job! 🌱' : 'Keep learning about climate action! 💡'}</p>
    `;
    
    // Scroll to score display
    scoreContainer.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Initialize quiz when page loads
  document.addEventListener('DOMContentLoaded', initializeQuiz);