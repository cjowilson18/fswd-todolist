import $ from 'jquery';

$.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
});

export var indexTasks = function (successCB, errorCB) {
    var request = {
        type: 'GET',
        url: 'api/tasks?api_key=1',
        success: successCB,
        error: errorCB
    }
    $.ajax(request);
};

indexTasks();

export var postTask = function (content, successCB, errorCB) {
    var request = {
      type: 'POST',
      url: 'api/tasks?api_key=1',
      data: {
        task: {
          content: content
        }
      },
      success: successCB,
      error: errorCB
    }
    $.ajax(request);
    indexTasks();
  };


export var destroy= function (id) {
    $.ajax({
     type: 'DELETE',
     url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1',
     success: function (response, textStatus) {
         console.log(response);
         indexTasks();
     },
     error: function(request, textStatus, errorMessage) {
         console.log(errorMessage);
     }
 });  
 }

 $(document).on('click', 'button.delete', function() {
    destroy($(this).data('id'));
});

export  var mark_active= function (id) {
    $.ajax({
        type: 'PUT',
        url: 'https://fewd-todolist-api.onrender.com/tasks/'+ id+ '/mark_active?api_key=1',
        dataType: 'json',
        success: function( response, textStatus){
            console.log(response);
            indexTasks();
        },
        error: function( request, textStatus, errorMessage){
            console.log(errorMessage);
        }
    })
}
export  var mark_complete= function(id) {
    $.ajax({
        type: 'PUT',
        url: 'https://fewd-todolist-api.onrender.com/tasks/'+ id+ '/mark_complete?api_key=1',
        dataType: 'json',
        success: function( response, textStatus){
            console.log(response);
            indexTasks();
        },
        error: function( request, textStatus, errorMessage){
            console.log(errorMessage);
        }
    })
}



$('#add-tasks').on('submit', function(e) {
    e.preventDefault();
    postTask($("#new-task-additions").val());

});