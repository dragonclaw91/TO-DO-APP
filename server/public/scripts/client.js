$(document).ready(onReady);


function onReady () {
getTasks();
//setting up clickhandlers for adding a task ,deleting a task,or marking a task as complete.
$("#tasks-table").on("click",".complete",completed);
$("table").on("click",".nuke",deleteTask);
$("#add").on("click",addTask);
}

function getTasks(){
    $.ajax({
        method: "GET",
        url: "/list"
    }).then(response => {
        console.log("GET tasks response",response);
        //emptying and buliding/rebuilding the table will be called every time a change is made to the table in the database.
        $("#tasks-table").empty();
        for(let i = 0; i< response.length;i++){
          let taskList = response[i];
          let className = ''; // default has no class
          if (taskList.isComplete) {
             className = 'completed';
          }
            $("#tasks-table").append(`<tr class=${className}>
            <td class=${className}>${taskList.task}</td>
            <td>${taskList.completed_at ? moment(taskList.completed_at).calendar() : 'not yet'}</td>
            <td><button data-taskid="${taskList.id}" class="nuke">DELETE</button></td>
            <td><button data-taskid="${taskList.id}" class="complete">DONE</button></td>
            </tr>`);
        }
    }).catch(error =>{
        console.log("there was an error getting tasks",error);
    })
}
//sending updated information back to the server to be sent ack to the database to update the item by id.
function completed(event) {
    const taskid = $(event.target).data("taskid");
    $.ajax({
      method: 'PUT',
      url: `/list/${taskid}`
    }).then(response =>
         getTasks())
    .catch(err => console.log(err));
  
  }
//deleting a task targeting by id on click of the delete button.
  function deleteTask(event) {
    const taskid = $(event.target).data("taskid");
    $.ajax({
      method: 'DELETE',
      url: `/list/${taskid}`
    }).then(response => getTasks())
    .catch(err => console.log(err));
  }
//building an object so it ccan be appended correctly 
  function addTask(){
      let task = {}
      task.task = $("#tasks").val()
      addTasks(task);
  }
//adding more things to the database and having it append the new item to the DOM.
  function addTasks(taskToAdd) {
    $.ajax({
      type: 'POST',
      url: '/list',
      data: taskToAdd,
      }).then((response) => {
        console.log('Response from server.', response);
        getTasks();
      }).catch(function(error) {
        console.log('Error in POST', error)
      });
  }




