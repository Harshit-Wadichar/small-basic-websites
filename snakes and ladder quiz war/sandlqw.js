document.addEventListener('DOMContentLoaded', () => {
    
    const diceFaces1 = [
        document.getElementById('dice1y'),
        document.getElementById('dice2y'),
        document.getElementById('dice3y'),
        document.getElementById('dice4y'),
        document.getElementById('dice5y'),
        document.getElementById('dice6y'),
    ];
    const diceFaces = [
        document.getElementById('dice1r'),
        document.getElementById('dice2r'),
        document.getElementById('dice3r'),
        document.getElementById('dice4r'),
        document.getElementById('dice5r'),
        document.getElementById('dice6r'),
    ];

    let boxes = document.querySelectorAll('.box');
    const gif = document.getElementById('gifr');
    const dice = document.getElementById('dicer');
    const gify = document.getElementById('gify');
    const dicey = document.getElementById('dicey');
    const buttonr = document.getElementById('rollr');
    const buttony = document.getElementById('rolly');
    const resety = document.getElementById('resety');
    const resetr = document.getElementById('resetr');
    const player1 = document.getElementById('circler');
    const player2 = document.getElementById('circley');
    let position1 = 1;
    let position2 = 1;
    let currentQuestionPlayer = null; // Track which player needs to answer the question
    let rightAnswer1 = 0;
    let rightAnswer2 = 0;
    let wrongAnswer1 = 0;
    let wrongAnswer2 = 0;
    
    // Ladder destinations
    const ladders = {
        7: 28,
        15: 21,
        22: 34,
        40: 47,
    };

    // Snake destinations
    const snakes = {
        32: 4,
        36: 18,
        44: 13,
    };

    // Update player position visually
    function updatePosition(player, pos) {
        const row = Math.floor((pos - 1) / 7); // Determine the row
        const col = (pos - 1) % 7; // Determine the column
        const x = (row % 2 === 1 ? 6 - col : col) * 90; // Calculate x position
        const y = row * 90; // Calculate y position
        player.style.transform = `translate(${x}px, ${y}px)`; // Update player position

        // Highlight the current box
        const boxIndex = row % 2 === 1 
            ? (row + 1) * 7 - 1 - col  // Reverse indexing for odd rows
            : row * 7 + col; // Normal indexing for even rows

        boxes.forEach(box => (box.style.backgroundColor = '')); // Reset all box colors
        if(player === player1){
        boxes[boxIndex].style.backgroundColor = 'red'; // Highlight the current box
        }
        else{
            boxes[boxIndex].style.backgroundColor = 'yellow'; // Highlight the current box
        }
        // Reset the box color after a delay
        setTimeout(() => {
            boxes[boxIndex].style.backgroundColor = ''; // Reset to default color
        }, 350);
    }

    // Animate movement to a target position
    function moveTo(player, position, target, entity, callback) {
        const interval = setInterval(() => {
            if (position < target) {
                position++;
                updatePosition(player, position);
            } else if (position > target) {
                position--;
                updatePosition(player, position);
            } else {
                clearInterval(interval);
                currentQuestionPlayer = player; // Set the current player who needs to answer the question
             
                if((position !== 49)&&(entity === false)){
                getMathQuestion(player === player2 ? '1' : '2');
               }
                if (callback) callback(position);
            }
        }, 300);
    }

    // Roll the dice
    function rollDice(player, position, diceFaces, gif, diceElement, buttonElement) {
        buttonElement.disabled = true;
        diceElement.style.display = 'none';
        const random = Math.floor(Math.random() * 6) + 1;

        diceFaces.forEach(dice => (dice.style.display = 'none'));
        gif.style.display = 'block';

        setTimeout(() => {
            gif.style.display = 'none';
            diceFaces[random - 1].style.display = 'block';

            let targetPosition = position + random;

            // Stay within board limits
            if (targetPosition > 49) {
                targetPosition = position; // Don't move
            }

            moveTo(player, position, targetPosition, false, (newPosition) => {
                let finalPosition = newPosition;
                let entity = true;
                // Handle ladders
                if (ladders[finalPosition]) {
                    const ladderTarget = ladders[finalPosition];
                    moveTo(player, finalPosition, ladderTarget, entity, () => {
                        finalizeMove(buttonElement, ladderTarget);
                    });
                }
                // Handle snakes
                else if (snakes[finalPosition]) {
                    const snakeTarget = snakes[finalPosition];
                    moveTo(player, finalPosition, snakeTarget, entity, () => {
                        finalizeMove(buttonElement, snakeTarget);
                    });
                }
                // Regular move
                else {
                    finalizeMove(buttonElement, finalPosition);
                }
            });
        }, 2000);
    }

    // Finalize move and check win condition
    function finalizeMove(currentButton, updatedPosition) {
        if (currentButton.id === 'rollr') {
            position1 = updatedPosition;
        } else {
            position2 = updatedPosition;
        }

        if (position1 === 49) {
            alert('Red wins!');
            buttonr.disabled = true;
            buttony.disabled = true;
            resetr.style.display = 'block';

            document.getElementById('questionh1').style.display = 'none';
            document.getElementById('questionh2').style.display = 'none';
            document.getElementById('options2').innerText = '';
            document.getElementById('options1').innerText = '';
            document.getElementById('correct-answer1').innerText = '';
            document.getElementById('correct-answer2').innerText = '';
            document.getElementById('question2').innerText = '';
            document.getElementById('question1').innerText = '';
            document.getElementById('result2').innerText = '';
            document.getElementById('result1').innerText = '';

            //player ke ans ka result
            document.getElementById('right-ans1').style.display = "block";
            document.getElementById('right-ans2').style.display = "block";
            document.getElementById('wrong-ans1').style.display = "block";
            document.getElementById('wrong-ans2').style.display = "block";
            document.getElementById('right-ans1').innerText = `right answers given by yellow : ${rightAnswer1}`;
            document.getElementById('right-ans2').innerText = `right answers given by red : ${rightAnswer2}`;
            document.getElementById('wrong-ans1').innerText = `wrong answers given by yellow : ${wrongAnswer1}`;
            document.getElementById('wrong-ans2').innerText = `wrong answers given by red : ${wrongAnswer2}`;

            // Highlight the winning box
            boxes.forEach(box => (box.style.display = 'none'));
            boxes[48].style.display = 'block';
            boxes[48].style.backgroundColor = 'red';
            boxes[48].style.transform = `scale(7)`;
            boxes[48].innerText = `Red wins!`;
            boxes[48].style.fontSize = '14px';
            
        } else if (position2 === 49) {
            alert('Yellow wins!');
            buttonr.disabled = true;
            buttony.disabled = true;
            resety.style.display = 'block';
        
            document.getElementById('questionh1').style.display = 'none';
            document.getElementById('questionh2').style.display = 'none';
            document.getElementById('options1').innerText = '';
            document.getElementById('correct-answer1').innerText = '';
            document.getElementById('correct-answer2').innerText = '';
            document.getElementById('question2').innerText = '';
            document.getElementById('question1').innerText = '';
            document.getElementById('result2').innerText = '';
            document.getElementById('result1').innerText = '';
            
            // Highlight the winning box
            boxes.forEach(box => (box.style.display = 'none'));
            boxes[48].style.display = 'block';
            boxes[48].style.backgroundColor = 'yellow';
            boxes[48].style.transform = `scale(7)`;
            boxes[48].innerText = `Yellow wins!`;
            boxes[48].style.fontSize = '14px';

            //player ke ans ka result
            document.getElementById('right-ans1').style.display = "block";
            document.getElementById('right-ans2').style.display = "block";
            document.getElementById('wrong-ans1').style.display = "block";
            document.getElementById('wrong-ans2').style.display = "block";
            document.getElementById('right-ans1').innerText = `right answers given by yellow : ${rightAnswer1}`;
            document.getElementById('right-ans2').innerText = `right answers given by red : ${rightAnswer2}`;
            document.getElementById('wrong-ans1').innerText = `wrong answers given by yellow : ${wrongAnswer1}`;
            document.getElementById('wrong-ans2').innerText = `wrong answers given by red : ${wrongAnswer2}`;

        } else{
            console.log(position1,position2)
        }
    }

    // Unified fetch and display math question function
    async function getMathQuestion(player) {
        try {
            const response = await fetch('http://localhost:3000/math-question');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            const questionElement = document.getElementById(`question${player}`);
            const correctAnswerElement = document.getElementById(`correct-answer${player}`);
            const optionsContainer = document.getElementById(`options${player}`);
            
            questionElement.innerText = data.question;
            correctAnswerElement.value = data.correctAnswer;

            optionsContainer.innerHTML = '';
            const optionsContainer1 = document.getElementById('options1');
            const optionsContainer2 = document.getElementById('options2');
            Array.from(optionsContainer1.children).forEach(button => button.disabled = false);
            Array.from(optionsContainer2.children).forEach(button => button.disabled = false);
              
            data.options.forEach((option) => {
                const optionElement = document.createElement('button');
                optionElement.innerText = option;
                optionElement.onclick = () => checkAnswer(option, correctAnswerElement, player, optionElement);
           
                optionElement.className = 'option-button';
                optionsContainer.appendChild(optionElement);
            });
        } catch (error) {
            console.error('Error fetching the math question:', error);
        }
    }

    // Unified check answer function
    function checkAnswer(userAnswer, correctAnswerElem, player, button) {
        const correctAnswer = parseFloat(correctAnswerElem.value);
        const resultElement = document.getElementById(`result${player}`);

        const optionsContainer = document.getElementById(`options${player}`);
        Array.from(optionsContainer.children).forEach(button => button.disabled = true);

        if (parseFloat(userAnswer) === correctAnswer) {
            resultElement.innerText = 'Correct!';
            resultElement.className = 'correct';
            button.style.backgroundColor = 'blue';
            if (player === '1') {
                buttony.disabled = false;
                rightAnswer1++;
            } else {
                buttonr.disabled = false;
                rightAnswer2++;
            }
            setTimeout(()=>{
                resultElement.innerText = '';

            },2000)
            currentQuestionPlayer = null; // Reset the current question player
        } else {
            resultElement.innerText = `Wrong! The correct answer is ${correctAnswer}`;
            resultElement.className = 'wrong';
            button.style.backgroundColor = 'Red';
            if (player === '1') {
                wrongAnswer1++;
            } else {
                wrongAnswer2++;
            }
            setTimeout(() => {
                getMathQuestion(player);
                resultElement.innerText = '';
            }, 2000);
        }
    }

    // Reset the game
    function resetGame() {
        position1 = 1;
        updatePosition(player1, position1);
        diceFaces.forEach(dice => (dice.style.display = 'none'));
        gif.style.display = 'none';
        dice.style.display = 'block';
        buttonr.disabled = false;

        position2 = 1;
        updatePosition(player2, position2);
        diceFaces1.forEach(dice => (dice.style.display = 'none'));
        gify.style.display = 'none';
        dicey.style.display = 'block';
        buttony.disabled = false;

        resety.style.display = 'none';
        resetr.style.display = 'none';

        boxes.forEach(box => (box.style.display = 'flex'));
        boxes[48].style.backgroundColor = '#4e5d6c';
        boxes[48].style.transform = `scale(1)`;
        boxes[48].innerText = '49';

        document.getElementById('options2').innerText = '';
            document.getElementById('options1').innerText = '';
            document.getElementById('correct-answer1').innerText = '';
            document.getElementById('correct-answer2').innerText = '';
            document.getElementById('question2').innerText = '';
            document.getElementById('question1').innerText = '';
            document.getElementById('result2').innerText = '';
            document.getElementById('result1').innerText = '';
            document.getElementById('questionh1').style.display = "block";
            document.getElementById('questionh2').style.display = "block";

            //player ke ans ka result
            document.getElementById('right-ans1').style.display = "none";
            document.getElementById('right-ans2').style.display = "none";
            document.getElementById('wrong-ans1').style.display = "none";
            document.getElementById('wrong-ans2').style.display = "none";
    }

    resety.addEventListener('click', resetGame);
    resetr.addEventListener('click', resetGame);
    buttonr.addEventListener('click', () => {
        rollDice(player1, position1, diceFaces, gif, dice, buttonr);
    });
    buttony.addEventListener('click', () => {
        rollDice(player2, position2, diceFaces1, gify, dicey, buttony);
    });
});