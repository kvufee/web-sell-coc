document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const randomId = getRandomInt(1, 200);
    const filterCondition = randomId > 100 ? `id=${randomId}` : `id_lt=${randomId}`;

    fetch(`https://jsonplaceholder.typicode.com/posts?${filterCondition}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            preloader.style.display = 'none';
            renderData(data);
        })
        .catch(error => {
            preloader.style.display = 'none';
            content.innerHTML = '<p>⚠ Что-то пошло не так</p>';
            console.error('There was a problem with the fetch operation:', error);
        });

    function renderData(data) {
        data.forEach(item => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `<h2>${item.title}</h2><p>${item.body}</p>`;
            content.appendChild(postElement);
        });
    }
});
