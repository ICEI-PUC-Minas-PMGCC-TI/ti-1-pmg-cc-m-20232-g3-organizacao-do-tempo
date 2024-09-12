const apiUrl = 'https://jsonserver.yasminmoreiira.repl.co/Tarefas';

async function getJson() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {

    try {
        var jsonData = await getJson();
        console.log(jsonData);

        // Filtrar tarefas concluídas
        var tarefasConcluidas = jsonData.filter(function (tarefa) {
            return tarefa.Status === "Concluida";
        });

        // Filtrar tarefas em aberto
        var tarefasAbertas = jsonData.filter(function (tarefa) {
            return tarefa.Status === "Aberta";
        });

        // Obter porcentagens
        var percentConcluidas = (tarefasConcluidas.length / jsonData.length) * 100;
        var percentAbertas = (tarefasAbertas.length / jsonData.length) * 100;

        // Criar gráfico de pizza
        var ctx = document.getElementById('pieChart').getContext('2d');
        var pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Concluídas', 'Em Aberto'],
                datasets: [{
                    data: [percentConcluidas, percentAbertas],
                    backgroundColor: ['#c5e898', '#3288c8']
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Porcentagem de Tarefas Concluídas e em Aberto',
                    fontColor: 'white'
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 15,
                                weight: 'bold',
                            },
                            color: 'white', 
                            padding: 40,
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error in DOMContentLoaded event:', error);
    }

});