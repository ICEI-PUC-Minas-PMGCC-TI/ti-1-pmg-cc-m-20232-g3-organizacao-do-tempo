import {id} from './app.js'
const apiUrl = 'https://jsonserver-tiaw.1499144.repl.co/tarefas?id_user='+id;

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
            return tarefa.status === "Concluida";
        });

        // Filtrar tarefas em aberto
        var tarefasAbertas = jsonData.filter(function (tarefa) {
            return tarefa.status === "aberto";
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
                    fontColor: 'White'
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
                            color: 'White', 
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