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


export  var destroy= function (id) {
    $.ajax({
     type: 'DELETE',
     url: 'api/tasks/' + id + '?api_key=1',
     success: function (response, textStatus) {
         console.log(response);
         indexTasks();
     },
     error: function(request, textStatus, errorMessage) {
         console.log(errorMessage);
     }
 });  
 }


export  var mark_active= function (id) {
    $.ajax({
        type: 'PUT',
        url: 'api/tasks/'+ id+ '/mark_active?api_key=1',
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
        url: 'api/tasks/'+ id+ '/mark_complete?api_key=1',
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
