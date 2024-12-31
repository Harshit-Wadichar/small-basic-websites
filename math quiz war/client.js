let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
const totalQuestions = 10;
let questionCount = 0;

async function getMathQuestion() {
    if (questionCount >= totalQuestions) {
        document.getElementById('game-status').innerText = 'Game Over!';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/math-question');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        // Update question for both players
        document.getElementById('question1').innerText = data.question;
        document.getElementById('question2').innerText = data.question;
        document.getElementById('correct-answer1').value = data.correctAnswer;
        document.getElementById('correct-answer2').value = data.correctAnswer;

        // Clear previous options
        const optionsContainer1 = document.getElementById('options1');
        const optionsContainer2 = document.getElementById('options2');
        optionsContainer1.innerHTML = '';
        optionsContainer2.innerHTML = '';

        // Add new options
        data.options.forEach(option => {
            const optionElement1 = document.createElement('button');
            const optionElement2 = document.createElement('button');
            optionElement1.innerText = option;
            optionElement2.innerText = option;
            optionElement1.onclick = () => checkAnswer(option, 1, optionElement1);
            optionElement2.onclick = () => checkAnswer(option, 2, optionElement2);
            optionElement1.className = 'option-button';
            optionElement2.className = 'option-button';
            optionsContainer1.appendChild(optionElement1);
            optionsContainer2.appendChild(optionElement2);
        });

        questionCount++;
        document.getElementById('game-status').innerText = `Question ${questionCount} of ${totalQuestions}`;
    } catch (error) {
        console.error('Error fetching the math question:', error);
    }
}

function checkAnswer(userAnswer, player, button) {
    // Disable all option buttons
    const optionsContainer1 = document.getElementById('options1');
    const optionsContainer2 = document.getElementById('options2');
    Array.from(optionsContainer1.children).forEach(button => button.disabled = true);
    Array.from(optionsContainer2.children).forEach(button => button.disabled = true);

    const correctAnswerElem = document.getElementById(`correct-answer${player}`);
    const correctAnswer = parseFloat(correctAnswerElem.value);
    const result = document.getElementById(`result${player}`);
    
    if (userAnswer === correctAnswer) {
        result.innerText = `Player ${player} is Correct!`;
        button.style.backgroundColor= 'green';

        setTimeout(()=>{
            result.innerText = '';
        },1500)
        result.className = 'correct';
        if (player === 1) {
            player1Score++;
        } else {
            player2Score++;
        }
    } else {
        result.innerText = `Player ${player} is Wrong! The correct answer is ${correctAnswer}`;
        button.style.backgroundColor= 'red';
        setTimeout(()=>{
            result.innerText = '';
        },1500)
        result.className = 'wrong';
        if (player === 1) {
            player2Score++;
        } else {
            player1Score++;
        }
    }

    updateScores();

    // Fetch the next question if the game is not over
    if (questionCount < totalQuestions) {
        setTimeout(getMathQuestion, 1500); // Add a short delay before fetching next question
    } else {
        document.getElementById('game-status').innerText = 'Game Over!';
    }
}

function updateScores() {
    document.getElementById('player1-score').innerText = `Score: ${player1Score}`;
    document.getElementById('player2-score').innerText = `Score: ${player2Score}`;
}

function resetGame() {
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;
    questionCount = 0;
    document.getElementById('player1-score').innerText = 'Score: 0';
    document.getElementById('player2-score').innerText = 'Score: 0';
    document.getElementById('question1').innerText = 'Press "Start" to get a question.';
    document.getElementById('question2').innerText = 'Press "Start" to get a question.';
    document.getElementById('options1').innerHTML = '';
    document.getElementById('options2').innerHTML = '';
    document.getElementById('result1').innerText = '';
    document.getElementById('result2').innerText = '';
    document.getElementById('game-status').innerText = 'Press "Start" to begin the game!';
    
}