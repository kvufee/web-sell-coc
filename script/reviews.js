document.addEventListener('DOMContentLoaded', function() 
{
    const preloader = document.getElementById('preloader');
    const errorMessage = document.getElementById('error-message');
    const commentsList = document.getElementById('comments-list');

    function fetchComments()
    {
        const randomFilter = Math.random() > 0.5 ? 'id_gte=100' : 'id_lte=200';
        const url = `https://jsonplaceholder.typicode.com/comments?${randomFilter}`;

        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (!response.ok) { throw new Error('Network response was not ok'); }

                    return response.json();
                })
                .then(data => { resolve(data); })
                .catch(error => { reject(error); });
        });
    }

    function formatDate(date) {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
    
        const formatter = new Intl.DateTimeFormat('ru-RU', options);
        return formatter.format(date).replace(',', '');
    }

    // че с промисом работает и как переписать
    // ограничить количество комментов до +- 20

    function renderComments(comments)
    {
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem.classList.add('comment-item');
            const date = new Date(new Date() - Math.random() * (1e+12));
            const dateFormatted = formatDate(date);

            commentItem.innerHTML = `
                <h4>${comment.name}</h4>
                <p>${comment.body}</p>
                <p>${comment.email} | ${dateFormatted}</p>
            `;

            commentsList.appendChild(commentItem);
        });
    }

    // renderComments в template

    fetchComments()
        .then(comments => {
            preloader.style.display = 'none';
            commentsList.style.display = 'block';
            renderComments(comments);
        })
        .catch(error => {
            preloader.style.display = 'none';
            errorMessage.style.display = 'block';
            console.error('Error fetching comments:', error);
        });
});
