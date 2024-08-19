let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];
if(localStorage.getItem("tasks")){
    arrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocalStorage();
// add task 
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToarray(input.value);
        input.value = "";
    }
}
tasksDiv.addEventListener("click",(e)=> {
    if(e.target.classList.contains("del")) {
        // remove from page
        e.target.parentElement.remove();
        //remove from storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    }
    if(e.target.classList.contains("task")) {
        toogleStatusTaskWith(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
})
function addTaskToarray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // push task to array 
    arrayOfTasks.push(task);
    // add tasks to page 
    addElementsToPageFrom(arrayOfTasks);
    // add tasks to local storage
    addDataToLocalstorageFrom(arrayOfTasks);
}
function addElementsToPageFrom(arrayOfTasks) {
    // empty task div 
    tasksDiv.innerHTML = "";
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        // check if done
        if (task.completed) {
            div.className = "task done"
        }
        div.className = "task";
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title))
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        // add to page
        tasksDiv.appendChild(div);
    });
}
function addDataToLocalstorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}
function deleteTaskWith(taskId){
    arrayOfTasks= arrayOfTasks.filter((task)=>task.id !=taskId);
    addDataToLocalstorageFrom(arrayOfTasks);
}
function toogleStatusTaskWith(taskId){
    for(let i=0 ;i<arrayOfTasks.length ;i++ ) {
        if(arrayOfTasks[i].id==taskId){
            arrayOfTasks[i].completed==false?(arrayOfTasks[i].completed= true) :(arrayOfTasks[i].completed= false);
        }
    }
    addDataToLocalstorageFrom(arrayOfTasks);
}