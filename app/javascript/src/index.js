import "./requests.js";
import $ from 'jquery';
import bootstrapBundle from "bootstrap/dist/js/bootstrap.bundle.js";

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
            htmlString += '<div class="row"><p class="col">' + task.content + '</p><p class="col"><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + ' style="margin-right: 15px;"><button class="btn btn-sm btn-outline-primary delete" data-id="' + task.id + '"> Delete Task </button></p>';
        });
        

        

        $("#tasks").html(htmlString);
    });
}

$(document).ready(function () {
    console.log('The DOM is ready');

    renderTasks();
    $(document).on('click', '.delete', function() {
        destroy($(this).data('id'));
        renderTasks();
        console.log("This should be deleted");
    });


    $('#add-tasks').on('submit', function (event) {
        event.preventDefault();
    
        console.log('The form is being submitted');
    
        postTask($("#new-task-additions").val(), function (response) {
            console.log(response);
            renderTasks();
        });
    });
})


