import "./requests.js";
import $ from 'jquery';
import {
    indexTasks,
    postTask,
    destroy,
    mark_active,
    mark_complete,
} from './requests.js';

console.log('index.js is loaded');

const renderTasks = function (tasks) {
    indexTasks(function (response) {
        console.log('All tasks', response);

        var htmlString = ''

        response.tasks.map(function(task) {
            htmlString += '<div class="row"><p class= "col-xs-8">' + task.content + '</p><input type="checkbox" class= " mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '><button class= "btn btn-sm btn-outline-primary delete" data-id="' + task.id + '"> Delete Task </button>';
        });

        $("#tasks").html(htmlString);
    });
}

$(document).ready(function () {
    console.log('The DOM is ready');

    renderTasks();

    $('#add-tasks').on('submit', function (event) {
        event.preventDefault();
    
        console.log('The form is being submitted');
    
        postTask($("#new-task-additions").val(), function (response) {
            console.log(response);
            renderTasks();
        });
    });
})


