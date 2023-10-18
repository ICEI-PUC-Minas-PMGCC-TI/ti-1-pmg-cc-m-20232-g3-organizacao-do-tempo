document.addEventListener("DOMContentLoaded", function ScrollCards () {
    const scrollContainer = document.getElementById('cards-tarefas')
    const scrollContent = document.querySelector(".card-tarefa");
    const scrollStep = 180; // Quantidade de pixels a serem rolados

    document.getElementById("forward").addEventListener("click", function ScrollCards () {
        scrollContainer.scrollLeft += scrollStep;
    });

    document.getElementById("backward").addEventListener("click", function ScrollCards () {
        scrollContainer.scrollLeft -= scrollStep;
    });
});

/*document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.getElementById('cards-tarefas')
    const scrollContent = document.querySelector(".card-tarefa");
    const scrollStep = 1; // Você pode ajustar isso conforme necessário

    document.getElementById("forward").addEventListener("click", function () {
        const visibleElements = document.querySelectorAll(".card-tarefa");
        const firstVisibleElement = Array.from(visibleElements).find((element) =>
            element.getBoundingClientRect().right >= 0
        );

        if (firstVisibleElement) {
            firstVisibleElement.scrollIntoView({ behavior: "smooth" });
        }
    });

    document.getElementById("backward").addEventListener("click", function () {
        const visibleElements = document.querySelectorAll(".card-tarefa");
        const lastVisibleElement = Array.from(visibleElements)
            .reverse()
            .find((element) => element.getBoundingClientRect().left <= scrollContainer.clientWidth);

        if (lastVisibleElement) {
            lastVisibleElement.scrollIntoView({ behavior: "smooth" });
        }
    });
});*/

