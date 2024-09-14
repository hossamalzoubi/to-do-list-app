let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");

// Store The Tasks
let arrayOfTasks = [];

// Check If There Tasks In Local Storage
if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
};

// Get Data From Local Storage Function 
getDataFromLocalStorage();

submit.onclick = function(){
    if(input.value !==""){
        addTaskToArray(input.value);
        input.value=""; 
    }
};

// Click On Task Element
taskDiv.addEventListener("click",(e) => {
    // Delete Button 
    if(e.target.classList.contains("fa-solid")){
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remove Element From Page
        e.target.parentElement.remove();
    }
});

function addTaskToArray(taskText){
    // Task Data
    const task = {
        id: Date.now(), 
        title: taskText, 
        completed: false
    };
    arrayOfTasks.push(task);
        
    addElementsToPage(arrayOfTasks);
        
    addDataToLocalStorage(arrayOfTasks);
};

function addElementsToPage(arrayOfTasks){
    taskDiv.innerHTML="";
    // Looping On Array Of Tasks
    arrayOfTasks.forEach(task => {
        // Create Main Div
        let div = document.createElement("div"); 
        div.className = "task";
        // Check If Task is Done
        if(task.completed === true){
            div.className = "done task";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title)); 
        // Create Delete Button
        let span = document.createElement("span");
        span.className="fa-solid fa-trash";  
            
        div.appendChild(span);
        taskDiv.appendChild(div);
        });
};

function addDataToLocalStorage(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPage(tasks);
        }
};

function deleteTaskWith(taskId){
    arrayOfTasks = arrayOfTasks.filter((task)=>task.id != taskId);
    addDataToLocalStorage(arrayOfTasks);
};
