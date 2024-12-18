let head = document.querySelector("#head");
let tail = document.querySelector("#tail");
let headT = document.querySelector("#headT");
let tailT = document.querySelector("#tailT");
let button = document.querySelector("#button");
let reset = document.querySelector("#reset");
let coin = document.querySelector(".coin-container");
let h = 0;
let t = 0;

function toss() {
    // Disable button during animation
    button.disabled = true;

    // Decide the outcome
    let isHeads = Math.random() < 0.5;

    // Reset animation by removing and reapplying it
    coin.style.animation = "none"; // Temporarily remove animation
    setTimeout(() => {
        coin.style.animation = isHeads ? "spin-heads 3s ease-in-out" : "spin-tails 3s ease-in-out";
    }, 10); // Short delay to reset the animation property

    // Update result after the animation completes
    setTimeout(() => {
        if (isHeads) {
            h++;
            headT.innerText = `${h}`;
        } else {
            t++;
            tailT.innerText = `${t}`;
        }

        // Re-enable button after animation
        button.disabled = false;
    }, 3000); // Match the animation duration
}

function reset1(){
    h = 0;
    headT.innerText = `${h}`;
    t = 0;
    tailT.innerText = `${t}`;
}

// Add event listener to the button
button.addEventListener("click", toss);
reset.addEventListener("click", reset1);