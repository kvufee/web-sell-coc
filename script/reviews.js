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

    function formatDate(date)
    {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

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

    fetchComments()
        .then(comments => {
            preloader.style.display = 'none';
            renderComments(comments);
        })
        .catch(error => {
            preloader.style.display = 'none';
            errorMessage.style.display = 'block';
            console.error('Error fetching comments:', error);
        });
});
