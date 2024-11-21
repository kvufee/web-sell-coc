document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const taskTemplate = document.getElementById('task-template');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const townHallLevel = document.getElementById('townHallLevel').value;
        const builderHutLevel = document.getElementById('builderHutLevel').value;
        const priority = document.getElementById('priority').value;
        const maxPrice = document.getElementById('maxPrice').value;

        const task = {
            townHallLevel: townHallLevel,
            builderHutLevel: builderHutLevel,
            priority: priority,
            maxPrice: maxPrice
        };

        saveTaskToLocalStorage(task);
        displayTask(task);
        form.reset();
    });

    loadTasksFromLocalStorage();
});

function saveTaskToLocalStorage(task) {
    try {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving task to local storage:', error);
    }
}

function loadTasksFromLocalStorage() {
    try {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            displayTask(task);
        });
    } catch (error) {
        console.error('Error loading tasks from local storage:', error);
    }
}

function displayTask(task) {
    const taskList = document.getElementById('taskList');
    const template = document.getElementById('task-template').content.cloneNode(true);

    const taskItem = template.querySelector('.task-item');
    taskItem.querySelector('.task-town-hall-level').textContent = `Уровень ратуши: ${task.townHallLevel}`;
    taskItem.querySelector('.task-builder-hut-level').textContent = `Уровень хижины строителя: ${task.builderHutLevel}`;
    taskItem.querySelector('.task-priority').textContent = `Приоритет: ${task.priority}`;
    taskItem.querySelector('.task-max-price').textContent = `Максимальная цена: ${task.maxPrice}`;

    const deleteButton = taskItem.querySelector('button');
    deleteButton.addEventListener('click', function() {
        removeTask(taskItem, task);
    });

    taskList.appendChild(taskItem);
}

function removeTask(taskItem, task) {
    taskItem.remove();
    try {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t =>
            t.townHallLevel !== task.townHallLevel ||
            t.builderHutLevel !== task.builderHutLevel ||
            t.priority !== task.priority ||
            t.maxPrice !== task.maxPrice
        );
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error removing task from local storage:', error);
    }
}
