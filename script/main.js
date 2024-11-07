const darkenButton = document.getElementById('darkenButton');

let darkened = false;

function toggleDarken() {
    if (!darkened) {
        document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        darkened = true;
    } else {
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        darkened = false;
    }
}

darkenButton.addEventListener('click', toggleDarken);