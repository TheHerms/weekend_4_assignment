$(function(){
  console.log('document ready');

getTasks();

$('#task-form').on('submit', addTask);
$('#task-list').on('click', '.complete', completeTask);

$('#task-list').on('click', '.delete', deleteTask);

});

function getTasks() {
  $.ajax({
    url: '/tasks',
    type: 'GET',
    success: displayTasks
  });
}

function displayTasks(tasks) {
  console.log('Tasks from server', tasks);

  $('#task-list').empty();

  tasks.forEach(function(task){
    var $li = $('<li></li>');

    var $form = $('<form></form>');

  $form.append('<input type="text" name="task" value="' + task.task + '"/>')

  var $completeButton = $('<button class="complete">Complete</button>');
    $completeButton.data('id', task.id);
    $form.append($completeButton);

  var $deleteButton = $('<button class="delete">Delete</button>');
    $deleteButton.data('id', task.id);
    $form.append($deleteButton);

    if(task.finished == true) {
      $form.addClass("finished")
    }

  $li.append($form);
  $('#task-list').append($li);
  });
}

function addTask(event) {
//this will prevent the browser from refreshing
  event.preventDefault();

//gets the info from our form
  var formData = $('#task-form').serialize();

  console.log(formData);
  // console.log($(this));
//sends the data to our server
  $.ajax({
    url:'/tasks',
    type: 'POST',
    data: formData,
    success: getTasks
  });
}

function completeTask(event) {
    event.preventDefault();
console.log($(this).data('id'));
    var $button = $(this);
    var $form = $button.closest('form');
    var data = $form.serialize();//information from the form
    $.ajax({
      url: '/tasks/' + $(this).data('id'),
      type: 'PUT',
      data: data,
      success: getTasks
    });
  }

  function deleteTask(event) {
     event.preventDefault();

//$(this) refers to the button that was clicked
     $.ajax({
       url: '/tasks/' + $(this).data('id'),
       type: 'DELETE',
       success: getTasks
     });

   }
