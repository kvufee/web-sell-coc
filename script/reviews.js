document.addEventListener('DOMContentLoaded', function() 
{
    const preloader = document.getElementById('preloader');
    const errorMessage = document.getElementById('error-message');
    const commentsList = document.getElementById('comments-list');
    const commentTemplate = document.getElementById('comment-template').content;

    async function fetchComments()
    {
        const randomFilter = Math.random() > 0.5 ? 'id_gte=100' : 'id_lte=200';
        const limit = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        const url = `https://jsonplaceholder.typicode.com/comments?${randomFilter}&_limit=${limit}`;

        try
        {
            const response = await fetch(url);

            if (!response.ok) { throw new Error('Network response was not ok'); }

            const data = await response.json();
            return data;
        } catch (error)
        {
            throw error;
        }
    }

    function formatDate(date)
    {
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

    function renderComments(comments)
    {
        commentsList.innerHTML = '';

        comments.forEach(comment => {
            const commentItem = commentTemplate.cloneNode(true);
            const date = new Date(new Date() - Math.random() * (1e+12));
            const dateFormatted = formatDate(date);

            commentItem.querySelector('h4').textContent = comment.name;
            commentItem.querySelectorAll('p')[0].textContent = comment.body;
            commentItem.querySelectorAll('p')[1].textContent = `${comment.email} | ${dateFormatted}`;

            commentsList.appendChild(commentItem);
        });
    }

    async function init()
    {
        try
        {
            const comments = await fetchComments();
            preloader.style.display = 'none';
            commentsList.style.display = 'block';

            renderComments(comments);
        } catch (error)
        {
            preloader.style.display = 'none';
            errorMessage.style.display = 'block';

            console.error('Error fetching comments:', error);
        }
    }

    init();
});
