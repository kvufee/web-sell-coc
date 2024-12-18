document.addEventListener('DOMContentLoaded', function()
{
    const form = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const taskTemplate = document.getElementById('task-template');

    form.addEventListener('submit', function(event)
    {
        event.preventDefault();

        const townHallLevel = document.getElementById('townHallLevel').value;
        const builderHutLevel = document.getElementById('builderHutLevel').value;
        const priority = document.getElementById('priority').value;
        const maxPrice = document.getElementById('maxPrice').value;

        const task =
        {
            id: generateUniqueId(),
            townHallLevel: townHallLevel,
            builderHutLevel: builderHutLevel,
            priority: priority,
            maxPrice: maxPrice
        };

        if (isDuplicateTask(task))
            {
            iziToast.show({
                title: 'Ошибка',
                message: 'Такой запрос уже существует!',
                position: 'bottomRight',
                color: 'red',
            });
        } else {
            saveTaskToLocalStorage(task);
            displayTask(task);

            iziToast.show({
                title: 'Успех',
                message: 'Запрос успешно добавлен!',
                position: 'bottomRight',
                color: 'green',
            });

            form.reset();
        }
    });

    loadTasksFromLocalStorage();
});

function generateUniqueId()
{
    return '_' + Math.random().toString(36).substr(2, 9);
}

function saveTaskToLocalStorage(task)
{
    try
    {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error)
    {
        console.error('Error saving task to local storage:', error);
    }
}

function loadTasksFromLocalStorage()
{
    try 
    {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => { displayTask(task); });
    } catch (error)
    {
        console.error('Error loading tasks from local storage:', error);
    }
}

function displayTask(task)
{
    const taskList = document.getElementById('taskList');
    const template = document.getElementById('task-template').content.cloneNode(true);

    const taskItem = template.querySelector('.task-item');
    taskItem.dataset.id = task.id;
    taskItem.querySelector('.task-town-hall-level').textContent = `Уровень ратуши: ${task.townHallLevel}`;
    taskItem.querySelector('.task-builder-hut-level').textContent = `Уровень хижины строителя: ${task.builderHutLevel}`;
    taskItem.querySelector('.task-priority').textContent = `Приоритет: ${task.priority}`;
    taskItem.querySelector('.task-max-price').textContent = `Максимальная цена: ${task.maxPrice}`;

    const deleteButton = taskItem.querySelector('button');
    deleteButton.addEventListener('click', function() { 
        removeTask(taskItem, task.id); 
    });

    taskList.appendChild(taskItem);
}

function removeTask(taskItem, taskId)
{
    taskItem.remove();
    try
    {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        iziToast.show({
            title: 'Удалено',
            message: 'Запрос успешно удалён!',
            position: 'bottomRight',
            color: 'blue',
        });
    } catch (error)
    {
        console.error('Error removing task from local storage:', error);
    }
}

function isDuplicateTask(newTask)
{
    try
    {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        return tasks.some(task => 
            task.townHallLevel === newTask.townHallLevel &&
            task.builderHutLevel === newTask.builderHutLevel &&
            task.priority === newTask.priority &&
            task.maxPrice === newTask.maxPrice);

    } catch (error)
    {
        console.error('Error checking for duplicate task:', error);
        return false;
    }
}
