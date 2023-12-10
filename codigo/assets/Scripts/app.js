var params = new URLSearchParams(location.search)
var id = params.get("id")
console.log(id);
const apiUrl = 'https://jsonserver-tiaw.1499144.repl.co/tarefas?id_user='+id;

function readTarefas(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler tarefas via API JSONServer:', error);
            displayMessage("Erro ao ler tarefas");
        });
}


function updateTarefas(id, concluir) {
fetch(`https://jsonserver-tiaw.1499144.repl.co/tarefas/${id}`)
  .then(response => response.json())
  .then(data => {
    // Atualize o campo desejado
    data.status = concluir
    //const tarefaEncontrada = jsonData[0].tarefas.find(tarefa => tarefa.id === targetTaskId);
    // Enviar uma requisição PUT para atualizar o objeto no servidor
    return fetch(`https://jsonserver-tiaw.1499144.repl.co/tarefas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  })
  .then(response => response.json())
  .then(updatedObject => {
    console.log('Campo atualizado com sucesso:', updatedObject);
    alert("Status da tarefa atualizado para concluido");
    location.reload();
  })
  .catch(error => {
    console.error('Erro ao concluir a tarefa:', error);
  });
}



var db = []
readTarefas(dados => {
    db = dados;
    ListarTarefas()
});

// função para listar as tarefas por ordem de data e horario  
function ListarTarefas() {
    db.sort((a, b) => {
        const DataA = new Date(`${a.date}`);
        const DataB = new Date(`${b.date}`);

        return DataA - DataB;
    });
    // limpa a lista de contatos apresentados
    let Tarefas_vertical = document.getElementById("Tarefas_vertical");

    // Popula a tabela com os registros do banco de dados
    for (let index = 0; index < db.length; index++) {
        const tarefa = db[index];
        if (tarefa.status == "aberto"){
            let prioridade;
            let recorrencia;
            //Pegar as Datas salvas no DB e convertar para o padrão BR
            let data = new Date(tarefa.date);
            let dia = (data.getDate()).toString().padStart(2, '0'); // Adicionar zero à esquerda, se necessário
            let mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Lembre-se que os meses em JavaScript são baseados em zero
            let ano = data.getFullYear();
            let hora = tarefa.date.split('T')[1];
            // Formatar a data no formato "DD/MM/AAAA"
            const dataFormatada = `${dia}/${mes}/${ano}`;

            //Verificar a recorrência
            if (tarefa.priority == "3") {
                prioridade = 'Alta'
            }if (tarefa.priority == "2") {
                prioridade = 'Média'
            }if (tarefa.priority == "1") {
                prioridade = 'Baixa'
            }

            //Verifica recorrência
            if(tarefa.recurrent == true){
                recorrencia = 'Sim';
            }else{
                recorrencia = 'Não'
            }
            // Inclui o contato na tabela    
            Tarefas_vertical.innerHTML += `
                    <div class="modal fade" id="exampleModal-${tarefa.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">${tarefa.name}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="Modal_conteudo">
                                        <p><b>Data:</b> ${dataFormatada}</p>
                                        <p><b>Horário:</b> ${hora}</p>
                                    </div>
                                    <div class="Modal_conteudo">
                                        <p><b>Recorrência:</b> ${recorrencia}</p>
                                        <p><b>Prioridade:</b> ${prioridade} </p>
                                    </div>
                                    <div class="Modal-Comentario">
                                        <p><b>Comentarios:</b></p>
                                        <textarea disabled>${tarefa.comment}</textarea>
                                    </div>
                                    <div class="modal-footer" style"background-color: rgb(33, 115, 238);">
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                                  
                    <div class="tarefas" id="${tarefa.id}">
                        <div class="conteudo">
                            <H3>${tarefa.name}</H3>
                            <p>${dataFormatada}, ${hora}</p>
                        </div>
                        <div class="icone">
                            <a href="#"><img src="assets/imgs/edicao.png" alt="icone de edição de tarefas"></a>
                            <a href="#"><img src="assets/imgs/lixeira-de-reciclagem.png" alt="icone de exclusãod e tarefas"></a>
                            <button class="btn_concluir" data-bs-toggle="modal" data-bs-target="#exampleModal-${tarefa.id}-concluir" id="botao_Modal_${tarefa.id}"></button>
                            <div>
                                <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal-${tarefa.id}" id="botao_Modal">
                                    Veja Mais
                                </button>
                            </div>
                        </div>                   
                    </div>
                    `
        }
    }

}

var db2 = []
readTarefas(dados => {
    db2 = dados;
    CardsTarefa()
});
//Função para listar as tarefas por ordem de prioridade
function CardsTarefa(){
    let Cards_Tarefas = document.getElementById("cards-tarefas");
    //ordenação do DB
    db2.sort((a, b) => {
        const priorityA = map_priority(a.priority);
        const priorityB = map_priority(b.priority);
        if(priorityA == priorityB){
            const DataA = new Date(`${a.date}`);
            const DataB = new Date(`${b.date}`);

            return DataA - DataB;
        }

        return priorityA - priorityB;
    });

    //Loop de geração dos cards
    for (let index = 0; index < db2.length; index++){
        const tarefa = db2[index];
        if (tarefa.status == "aberto"){
            let cor;
            //Pegar as Datas salvas no DB e convertar para o padrão BR
            let data = new Date(tarefa.date);
            let dia = (data.getDate()).toString().padStart(2, '0'); // Adicionar zero à esquerda, se necessário
            let mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Lembre-se que os meses em JavaScript são baseados em zero
            let ano = data.getFullYear();
            let hora = tarefa.date.split('T')[1];
            // Formatar a data no formato "DD/MM/AAAA"
            const dataFormatada = `${dia}/${mes}/${ano}`;
            if (tarefa.priority == "3") {
                cor = '#E0473F';
            }if (tarefa.priority == "2") {
                cor = '#F2A516'
            }if (tarefa.priority == "1") {
                cor = '#F0DC4B'
            }

            Cards_Tarefas.innerHTML += `
            <div class="card-tarefa" style="Background-color:${cor}">                           
                <div class="card-corpo">
                    <div class="card-header">
                        <h5 class="card-titulo">${tarefa.name}</h5>
                        <button class="btn_concluir" data-bs-toggle="modal" data-bs-target="#exampleModal-${tarefa.id}-concluir" id="botao_Modal_${tarefa.id}"></button>
                    </div>
                    <p class="card-texto">${dataFormatada}<br>${hora}</p>
                </div>
            </div>`;
        }

    }
    /*Looping para gerar o modal para concluir tarefas dos cards*/
    for(let index = 0; index < db2.length; index++){
        const tarefa_box = db2[index]
        if (tarefa_box.status == "aberto"){
            Cards_Tarefas.innerHTML += `
            <div class="modal fade" id="exampleModal-${tarefa_box.id}-concluir" tabindex="1000" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">${tarefa_box.name}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="Modal_conteudo">
                                <p><b>Deseja mesmo concluir esta tarefa?</b> </p>
                            </div>
                            <div class="modal-footer" style"background-color: rgb(33, 115, 238);">
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
                                <button type="button" class="btn_update_status" id="btn_${tarefa_box.id}" >Concluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> `
        } 
    }

    concluir();
    
}

function concluir(){
    var btnUpdate = document.querySelectorAll('.btn_update_status');
    console.log(btnUpdate)
    //btnUpdate.forEach(function(botao) {
    for(let btn of btnUpdate){
        btn.addEventListener ('click', function () {
            // Obtem os valores dos campos do formulário
            let btn_Id = btn.getAttribute("id");
            console.log(btn_Id)
            let Id_tarefa = btn_Id.match(/\d+/g);
            // Cria um objeto com os dados do contato
            let Tarefa = 'Concluida'
                    
            // Altera a Tarefa no banco de dados
            updateTarefas(parseInt(Id_tarefa), Tarefa);
        }); 
    } 
}





function map_priority(priority){
    if (priority == '3') {
        return 1;
    }if (priority == '2') {
        return 2;
    }if (priority == '1') {
        return 3;
    }
}
window.onload = CardsTarefa()
window.onload = ListarTarefas()

 
