document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const data = document.getElementById('data').value;
        const imageInput = document.getElementById('image').files[0];
        const description = document.getElementById('description').value;
        const maxPrice = document.getElementById('maxPrice').value;
        

        const reader = new FileReader();
        reader.onload = function(event) {
            const imageData = event.target.result;

            const task = {
                data: data,
                image: imageData,
                description: description,
                maxPrice: maxPrice
  
            };

            saveTaskToLocalStorage(task);
            displayTask(task);
            form.reset();
        };

        if (imageInput) {
            reader.readAsDataURL(imageInput);
        } else {
            alert('Пожалуйста, выберите изображение.');
        }
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

    const taskData = document.createElement('p');
    taskData.textContent = `Данные: ${task.description}`;

    const taskImage = document.createElement('img');
    taskImage.src = task.image;
    taskImage.alt = 'Изображение аккаунта';
    taskImage.style.maxWidth = '100px';
    taskImage.style.maxHeight = '100px';

    const taskDescription = document.createElement('p');
    taskDescription.textContent = `Описание: ${task.description}`;

    const taskMaxPrice = document.createElement('p');
    taskMaxPrice.textContent = `Максимальная цена: ${task.maxPrice}`;


    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', function() {
        removeTask(taskItem, task);
    });

    taskItem.appendChild(taskData);
    taskItem.appendChild(taskImage);
    taskItem.appendChild(taskDescription);
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