const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dueDate = document.getElementById("due-date");
const priority = document.getElementById("priority");


function addTask(){
    if(inputBox.value.trim() === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");

        li.innerHTML = `
            <div class="task-content">
                <strong>${inputBox.value}</strong>
                <small>Due: ${dueDate.value || "No date"}</small>
                <small>Priority: ${priority.value}</small>
            </div>
        `;

        // Delete button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        // Edit button
        let editBtn = document.createElement("button");
        editBtn.innerHTML = "✏";
        editBtn.style.marginRight = "40px";
        editBtn.style.position = "absolute";
        editBtn.style.right = "40px";
        editBtn.style.bottom = "25px";

        editBtn.onclick = function(){
            let newTask = prompt("Edit task:", inputBox.value);
            if(newTask !== null && newTask.trim() !== ""){
                li.querySelector("strong").innerText = newTask;
                saveData();
            }
        };

        li.appendChild(editBtn);

        listContainer.appendChild(li);
    }

    inputBox.value = "";
    dueDate.value = "";
    saveData();
}


listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();