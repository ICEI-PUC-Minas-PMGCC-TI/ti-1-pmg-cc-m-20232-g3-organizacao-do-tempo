const apiUrl = 'https://jsonserver.andre-luizlui75.repl.co/Tarefas'

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



var db = []
        readTarefas(dados => {
            db = dados;
            ListarTarefas()
        });

        // função para listar na tabela os contatos que estão associados aos filtros 
        function ListarTarefas() {
            
            // limpa a lista de contatos apresentados
            var Cards_Tarefas = document.getElementById("cards-tarefas");
            var Tarefas_vertical = document.getElementById("Tarefas_vertical");
            
            // Popula a tabela com os registros do banco de dados
            for (let index = 0; index < db.length; index++) {
                const tarefa = db[index];
                let cor;
                if(tarefa.Prioridade == "Alta"){
                    cor = 'Red';
                }if(tarefa.Prioridade == "Média") {
                    cor = 'Orange'
                }if(tarefa.Prioridade == "Baixa") {
                    cor = 'Yellow'
                }

                    // Inclui o contato na tabela    
                Cards_Tarefas.innerHTML += `
                    <div class="card-tarefa" style="Background-color:${cor}">                           
                        <div class="card-corpo">
                            <h5 class="card-titulo">${tarefa.nome}</h5>
                            <p class="card-texto">${tarefa.Recorrência}<br>${tarefa.Hora_inicial} às ${tarefa.Hora_final}</p>
                        </div>
                    </div>`;
                
                Tarefas_vertical.innerHTML +=`
                <div class="tarefas">
                    <div class="conteudo">
                        <H3>${tarefa.nome}</H3>
                        <p>${tarefa.Recorrência}, ${tarefa.Hora_inicial} às ${tarefa.Hora_final}</p>
                        <p hidden class="id">${tarefa.id}</p>
                    </div>
                    <div class="icone">
                        <a href="#"><img src="assets/imgs/edicao.png" alt="icone de edição de tarefas"></a>
                        <a href="#"><img src="assets/imgs/lixeira-de-reciclagem.png" alt="icone de exclusãod e tarefas"></a>
                        <div>
                            <button type="button" class="btn btn-secondary " data-bs-toggle="modal" data-bs-target="#exampleModal onclick="ModalTarefas(document.getElementsByClassName('id'))">
                                Veja Mais
                            </button>
                        </div>
                    </div>                   
                </div>
                `
            }
        }

        function ModalTarefa(id){
            var Modal_Tarefas = document.getElementById("exampleModal")
            let tarefa;
            for (let index = 0; index < db.length; index++){
                const tarefa_atual = db[index]
                if(tarefa_atual.id == id){
                    tarefa = tarefa_atual
                }
            }
            Modal_Tarefas.innerHTML =`
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">${tarefa.nome}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="Modal_conteudo">
                                <p>Data:${tarefa.Data}</p>
                                <p>Horário:${tarefa.Hora_inicial} às ${tarefa.Hora_final}
                            </div>
                            <div class="Modal_conteudo">
                                <p>Recorrência:${tarefa.Recorrência}</p>
                                <p>Prioridade:${tarefa.Prioridade} 
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>               
                `
        }
        
        window.onload = ListarTarefas()

        
