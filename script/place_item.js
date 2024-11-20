document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const townHallLevel = document.getElementById('townHallLevel').value;
        const builderHutLevel = document.getElementById('builderHutLevel').value;
        const trophiesMain = document.getElementById('trophiesMain').value;
        const trophiesBH = document.getElementById('trophiesBH').value;
        const maxPrice = document.getElementById('maxPrice').value;

        const task = {
            townHallLevel: townHallLevel,
            builderHutLevel: builderHutLevel,
            trophiesMain: trophiesMain,
            trophiesBH: trophiesBH,
            maxPrice: maxPrice
        };

        saveTaskToLocalStorage(task);
        displayTask(task);
        form.reset();
    });

    loadTasksFromLocalStorage();
});

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        displayTask(task);
    });
}

function displayTask(task) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    const taskTownHallLevel = document.createElement('p');
    taskTownHallLevel.textContent = `Уровень ратуши: ${task.townHallLevel}`;

    const taskBuilderHutLevel = document.createElement('p');
    taskBuilderHutLevel.textContent = `Уровень хижины строителя: ${task.builderHutLevel}`;

    const taskTrophiesMain = document.createElement('p');
    taskTrophiesMain.textContent = `Трофеи: ${task.taskTrophiesMain}`;

    const taskTrophiesBH = document.createElement('p');
    taskTrophiesBH.textContent = `Трофеи строителя: ${task.taskTrophiesBH}`;

    const taskMaxPrice = document.createElement('p');
    taskMaxPrice.textContent = `Максимальная цена: ${task.maxPrice}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', function() {
        removeTask(taskItem, task);
    });

    taskItem.appendChild(taskTownHallLevel);
    taskItem.appendChild(taskBuilderHutLevel);
    taskItem.appendChild(taskTrophiesMain);
    taskItem.appendChild(taskTrophiesBH);
    taskItem.appendChild(taskMaxPrice);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
}

function removeTask(taskItem, task) {
    taskItem.remove();
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t =>
        t.townHallLevel !== task.townHallLevel ||
        t.builderHutLevel !== task.builderHutLevel ||
        t.trophiesMain !== task.trophiesMain ||
        t.trophiesBH !== task.trophiesBH ||
        t.maxPrice !== task.maxPrice
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
}