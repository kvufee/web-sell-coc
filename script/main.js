(function () {
    const currentPage = document.location.href;

    const menuItems = document.querySelectorAll('nav ul li a');

    menuItems.forEach(item => {
        if (item.href === currentPage) {
            item.classList.add('active');
        }
    });

    var startTime = new Date().getTime();

    window.addEventListener("load", function () {
        var endTime = new Date().getTime();
        var duration = endTime - startTime;

        var footer = document.querySelector("footer");
        var loadInfo = document.createElement("p");
        loadInfo.textContent = "Время загрузки страницы: " + duration + " мс";

        footer.appendChild(loadInfo);
    });
})();