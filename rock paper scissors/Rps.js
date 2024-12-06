let user_score = 0;
let comp_score = 0;

const compChoice = document.querySelectorAll(".comp-choice");
const choices = document.querySelectorAll(".images");
const msg = document.querySelector("#msg");
const userScore = document.querySelector("#user-score");
const compScore = document.querySelector("#comp-score");

let prevChoice = null; // Variable to keep track of the previous user choice
let prevCompChoice = null; // Variable to keep track of the previous computer choice

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        
        // Reset the background color of the previous user choice
        if (prevChoice) {
            prevChoice.style.backgroundColor = "";
        }

        // Set the background color of the current user choice
        choice.style.backgroundColor = "green";

        // Update the previous user choice
        prevChoice = choice;
        
        playGame(userChoice);
    });
});

const genCompChoice = () => {
    const options = ["paper", "rock", "scissors"];
    const index = Math.floor(Math.random() * 3);
    console.log("computer chose", options[index]);

    // Reset the background color of the previous computer choice
    if (prevCompChoice) {
        prevCompChoice.style.backgroundColor = "";
    }

    // Set the background color of the current computer choice
    if (options[index] === "paper") {
        compChoice[0].style.backgroundColor = "green";
        prevCompChoice = compChoice[0];
    } else if (options[index] === "rock") {
        compChoice[1].style.backgroundColor = "green";
        prevCompChoice = compChoice[1];
    } else if (options[index] === "scissors") {
        compChoice[2].style.backgroundColor = "green";
        prevCompChoice = compChoice[2];
    }

    return options[index];
}

const drawGame = () => {
    console.log("game is draw");
    msg.innerText = "Draw, play again";
    msg.style.backgroundColor = "grey";
}

const playGame = (userChoice) => {
    console.log("user clicked", userChoice);
    const computerChoice = genCompChoice();

    if (userChoice === computerChoice) {
        drawGame();
    } else {
        const userWin = userChoice === "rock" ? computerChoice !== "paper" :
                        userChoice === "paper" ? computerChoice !== "scissors" :
                        userChoice === "scissors" ? computerChoice !== "rock" : true;
        
        showWinner(userWin, userChoice, computerChoice);
    }
}

const showWinner = (userWin, userChoice, computerChoice) => {
    if (userWin) {
        console.log("you won");
        msg.innerText = `You win, your ${userChoice} beat ${computerChoice}`;
        msg.style.backgroundColor = "#42d70c";
        user_score++;
        userScore.innerText = user_score;
    } else {
        console.log("you lose");
        msg.innerText = `You lose, computer's ${computerChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "coral";
        comp_score++;
        compScore.innerText = comp_score;
    }
}
