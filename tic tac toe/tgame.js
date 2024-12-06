let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset-btn");
let msg = document.querySelector("#msg");
let msgcontainer = document.querySelector(".msg-container");
let newbtn = document.querySelector("#new");
let heading = document.querySelector(".heading");
let turnO = true;//playerX,playerO
let win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
boxes.forEach(box => {
    box.addEventListener( "click", () =>{
        console.log("box is clicked");
        if(turnO){
            box.innerText = "O";
            box.style.color = "#E74C3C";
            box.style.backgroundColor = "white";
            turnO = false;
        }else{
            box.innerText = "X"
            box.style.color = "#5B9BD5";
            box.style.backgroundColor = "white";
            turnO = true;
        }
        box.disabled = true;
        checkwinner();
    })
});
let checkwinner = () =>{
  for(let pattern of win){
    position1 = boxes[pattern[0]].innerText;
    position2 = boxes[pattern[1]].innerText;
    position3 = boxes[pattern[2]].innerText;
    if(position1 !== "" && position2 !== "" && position3 !== ""){
        if( position1 === position2 && position2 === position3){
            console.log("winner",position1)
            boxes[pattern[0]].style.backgroundColor = "lavender";
            boxes[pattern[1]].style.backgroundColor = "lavender";
            boxes[pattern[2]].style.backgroundColor = "lavender";
            winnermsg(position1);
            disablebox();
        }
    }
  }
} 
let winnermsg = (winner) => {
    msg.innerText = `Winner is ${winner}`
    heading.style.marginBottom = "40px";
    reset.style.marginBottom = "40px";
    msgcontainer.classList.remove("hide");
}
let disablebox = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
const resetgame = () =>{
    turnO = "true";
    enableboxes();
    msgcontainer.classList.add("hide");
}
let enableboxes = () =>{
    for(let box of boxes){
        heading.style.marginBottom = "10px";
        reset.style.marginBottom = "0px";
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "#A8CCF0";
    }
}
newbtn.addEventListener("click",resetgame);
reset.addEventListener("click",resetgame);