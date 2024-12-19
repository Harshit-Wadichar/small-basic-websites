let inputBox = document.getElementById("inputBox");
let listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must enter text in the input box"); 
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value; // Use '=' for assignment
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN")
    {
        let parentLi = e.target.parentElement; 
        if (parentLi.classList.contains("checked")) {
             parentLi.remove(); saveData(); 
            } 
        else { 
                alert("You can only delete tasks when you do it (You can only delete checked tasks)");
             }
    }

}, false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();