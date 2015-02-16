var inputTask = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var taskIncompleteHolder = document.getElementById("incomplete-tasks");
var taskCompleteHolder = document.getElementById("completed-tasks");

//New task li
var createNewTaskElement = function(taskString) {
  //Create li
  var listItem = document.createElement("li");
  
  //Checkbox
  var checkBox = document.createElement("input");
  //Label
  var label = document.createElement("label");
  //Input (text)
  var editInput = document.createElement("input");
  //Button.edit
  var editButton = document.createElement("button");
  //Button.delete
  var delButton = document.createElement("button");
  
  //Modify elements
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  delButton.innerText = "Delete";
  delButton.className = "delete";
  label.innerText = taskString;
  
  //Append elements
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput); 
  listItem.appendChild(editButton); 
  listItem.appendChild(delButton);  
  return listItem;
}

//Add a new task
var addTask = function() {
  console.log("Add task");
  //Create new li with text from #new-task
  var listItem = createNewTaskElement(inputTask.value);
  
  //Append li to taskIncompleteHolder
  taskIncompleteHolder.appendChild(listItem);
  bindTaskEvent(listItem, taskComplete); 
  
  inputTask.value = "";
}
  

//Edit existing tasks
var editTask = function() {
  console.log("Edit task");
  
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");

  //If parent class is .editMode
  if(containsClass) {
    //Switch from .editMode
    //Set label text to input value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //Set label text to input value
    editInput.value = label.innerText;
  }

  //Toggle parent .editMode on li
  listItem.classList.toggle("editMode");
}
  

//Delete existing tasks
var delTask = function() {
  console.log("Delete task");
    
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  //Remove parent li from ul
  ul.removeChild(listItem);
}
  

//Mark tasks as complete
var taskComplete = function() {
  console.log("Complete task");
  //Append task li to the #completed-tasks
  var listItem = this.parentNode;
  taskCompleteHolder.appendChild(listItem);
  bindTaskEvent(listItem, taskIncomplete);
}
  

//Mark tasks as incomplete
var taskIncomplete = function() {
  console.log("Incomplete task");
  //Append task li to #incomplete-tasks
  var listItem = this.parentNode;
  taskIncompleteHolder.appendChild(listItem);
  bindTaskEvent(listItem, taskComplete);  
}

var bindTaskEvent = function(taskLi, checkBoxEventHandler) {
  console.log("Bind li event");
  //Select li children
  var checkBox = taskLi.querySelector("input[type=checkbox]");
  var editButton = taskLi.querySelector("button.edit");
  var delButton = taskLi.querySelector("button.delete");
  
  //Bind editTask to edit button
  editButton.onclick = editTask; 
  
  //Bind delTask to delete button
  delButton.onclick = delTask;
  
  //bind checkBoxEventHandler to checkbox  
  checkBox.onchange = checkBoxEventHandler;
}

var ajaxReq = function() {
  console.log("Ajax request");  
}

//Set click handler to addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxReq);

//Iterate over taskIncompleteHolder ul li items
for(var i = 0; i < taskIncompleteHolder.children.length; i++) {
  //Bind event to li children (taskComplete)
  bindTaskEvent(taskIncompleteHolder.children[i], taskComplete);
}
  

//Iterate over taskCompleteHolder ul li items
for(var i = 0; i < taskCompleteHolder.children.length; i++) {
  //Bind event to li children (taskIncomplete)
  bindTaskEvent(taskCompleteHolder.children[i], taskIncomplete);
}
  