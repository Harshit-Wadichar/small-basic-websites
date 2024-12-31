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
let position1 = 49;
let position2 = 1;

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
    if(player===player1){
        boxes[boxIndex].style.backgroundColor = 'red'; // Highlight the current box
    }
    else{
        boxes[boxIndex].style.backgroundColor = 'yellow'; // Highlight the current box
    }
    

    // Reset the box color after a delay
    setTimeout(() => {
        boxes[boxIndex].style.backgroundColor = ''; // Reset to default color
    }, 300);
    
}

// Animate movement to a target position
function moveTo(player, position, target, callback) {
    const interval = setInterval(() => {
        if (position < target) {
            position++;
            updatePosition(player, position);
        } else if (position > target) {
            position--;
            updatePosition(player, position);
        } else {
            clearInterval(interval);
            if (callback) callback(position);
        }
    }, 300);
}

// Roll the dice
function rollDice(player, position, diceFaces, gif, diceElement, buttonElement, opponentButton) {
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

        moveTo(player, position, targetPosition, (newPosition) => {
            let finalPosition = newPosition;

            // Handle ladders
            if (ladders[finalPosition]) {
                const ladderTarget = ladders[finalPosition];
                moveTo(player, finalPosition, ladderTarget, () => {
                    finalizeMove(buttonElement, opponentButton, ladderTarget);
                });
            }
            // Handle snakes
            else if (snakes[finalPosition]) {
                const snakeTarget = snakes[finalPosition];
                moveTo(player, finalPosition, snakeTarget, () => {
                    finalizeMove(buttonElement, opponentButton, snakeTarget);
                });
            }
            // Regular move
            else {
                finalizeMove(buttonElement, opponentButton, finalPosition);
            }
        });
    }, 2000);
}

// Finalize move and check win condition
function finalizeMove(currentButton, opponentButton, updatedPosition) {
    if (currentButton.id === 'rollr') {
        position1 = updatedPosition;
    } else {
        position2 = updatedPosition;
    }

    if (position1 === 49) {
        alert('Red wins!');
        currentButton.disabled = true;
        opponentButton.disabled = true;
        resetr.style.display = 'block';
        
             // Highlight the winning box
            boxes.forEach(box => (box.style.display = 'none'));
            boxes[48].style.display = 'block';
            boxes[48].style.backgroundColor = 'red';
            boxes[48].style.transform = `scale(7)`;
            boxes[48].innerText = `Red wins!`;
                boxes[48].style.fontSize = '14px';
            
        
    } else if (position2 === 49) {
        alert('Yellow wins!');
        currentButton.disabled = true;
        opponentButton.disabled = true;
        resety.style.display = 'block';
    
           // Highlight the winning box
            boxes.forEach(box => (box.style.display = 'none'));
            boxes[48].style.display = 'block';
            boxes[48].style.backgroundColor = 'yellow';
            boxes[48].style.transform = `scale(7)`;
            boxes[48].innerText = `Yellow wins!`;
            boxes[48].style.fontSize = '14px';
            
    } else {
        currentButton.disabled = true;
        opponentButton.disabled = false;
    }
}

// Reset the game for Player 1 (Red)
function resetGame1() {
    position1 = 1;
    updatePosition(player1, position1);
    diceFaces.forEach(dice => (dice.style.display = 'none'));
    gif.style.display = 'none';
    dice.style.display = 'block';
    buttonr.disabled = false;
    // Reset Player 2 (Yellow)
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
}

// Reset the game for Player 2 (Yellow)
function resetGame2() {
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

    boxes.forEach(box => (
        box.style.display = 'flex'

    ));
    boxes[48].style.backgroundColor = '#4e5d6c';
    boxes[48].style.transform = `scale(1)`;
    boxes[48].innerText = '49';
}

resety.addEventListener('click', resetGame1);
resetr.addEventListener('click', resetGame2);
buttonr.addEventListener('click', () => {
    rollDice(player1, position1, diceFaces, gif, dice, buttonr, buttony);
});
buttony.addEventListener('click', () => {
    rollDice(player2, position2, diceFaces1, gify, dicey, buttony, buttonr);
});

