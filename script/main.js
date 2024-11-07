(function () {
    var startTime = new Date().getTime();

    window.addEventListener("load", function () {
        var endTime = new Date().getTime();
        var duration = endTime - startTime;

        var footer = document.querySelector("footer");
        var loadInfo = document.createElement("p");
        loadInfo.textContent = "Время загрузки страницы: " + duration + " мс";

        footer.appendChild(loadInfo);
    });
    
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
})();