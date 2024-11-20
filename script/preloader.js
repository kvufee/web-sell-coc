document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const todoList = document.getElementById('todo-list');
    const errorMessage = document.getElementById('error-message');

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async function fetchTodos() {
        try {
            const randomId = getRandomInt(1, 200);
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos?id=${randomId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            renderTodos(data);
        } catch (error) {
            showError(error.message);
        } finally {
            preloader.style.display = 'none';
        }
    }

    function showError(message) {
        errorMessage.textContent = `⚠ ${message}`;
        errorMessage.style.display = 'block';
    }

    function renderTodos(todos) {
        todoList.innerHTML = todos.map(todo => `
            <div>
                <h3>${todo.title}</h3>
                <p>Completed: ${todo.completed ? 'Yes' : 'No'}</p>
            </div>
        `).join('');
    }
    
    fetchTodos();
});
