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
            //Ordenar Db por Data das tarefas
            db.sort((a,b) => {
                const DataA = new Date(a.Data);
                const Datab = new Date(b.Data);

                return DataA - Datab;
            });
            console.log(db)
            // limpa a lista de contatos apresentados
            let Cards_Tarefas = document.getElementById("cards-tarefas");
            let Tarefas_vertical = document.getElementById("Tarefas_vertical");
            
            // Popula a tabela com os registros do banco de dados
            for (let index = 0; index < db.length; index++) {
                const tarefa = db[index];
                let cor;
                //Pegar as Datas salvas no DB e convertar para o padrão BR
                let data = new Date(tarefa.Data);
                console.log(data)
                let dia = (data.getDate() + 1).toString().padStart(2, '0'); // Adicionar zero à esquerda, se necessário
                let mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Lembre-se que os meses em JavaScript são baseados em zero
                let ano = data.getFullYear();
                console.log(dia)
                console.log(mes)
                console.log(ano)
                // Formatar a data no formato "DD/MM/AAAA"
                const dataFormatada = `${dia}/${mes}/${ano}`;
                console.log(dataFormatada)
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
                            <p class="card-texto">${dataFormatada}<br>${tarefa.Hora_inicial} às ${tarefa.Hora_final}</p>
                        </div>
                    </div>`;
                
                Tarefas_vertical.innerHTML +=`
                <div class="tarefas">
                    <div class="conteudo">
                        <H3>${tarefa.nome}</H3>
                        <p>${dataFormatada}, ${tarefa.Hora_inicial} às ${tarefa.Hora_final}</p>
                        <p hidden class="id">${tarefa.id}</p>
                    </div>
                    <div class="icone">
                        <a href="#"><img src="assets/imgs/edicao.png" alt="icone de edição de tarefas"></a>
                        <a href="#"><img src="assets/imgs/lixeira-de-reciclagem.png" alt="icone de exclusãod e tarefas"></a>
                        <div>
                            <button type="button" class="btn btn-secondary " data-bs-toggle="modal" data-bs-target="#exampleModal" id="botao_Modal">
                                Veja Mais
                            </button>
                        </div>
                    </div>                   
                </div>
                `
            }
        }

        function ordena_nome_asc(o1,o2){
            var a = new Date(dataFormat(o1.Data)[2], dataFormat(o1.Data)[1], dataFormat(o1.Data)[0]);
            var b = new Date(dataFormat(o2.Data)[2], dataFormat(o2.Data)[1], dataFormat(o2.Data)[0]);
            console.log(a)
            console.log(b)
            if(a > b){
                return -1;
            }else if(a < b){
                return 1;
            }else{
                return 0;
            }       
        };

        function ModalTarefa(){
            let Modal_Tarefas = document.getElementById("exampleModal");
            
            //let tarefa;
            /*for (let index = 0; index < db.length; index++){
                const tarefa_atual = db[index]
                if(tarefa_atual.id == id){
                    tarefa = tarefa_atual
                }*/
            
            Modal_Tarefas.innerHTML =`
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">oiiii</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="Modal_conteudo">
                                <p>Data:teste</p>
                                <p>Horário:teste às teste</p>
                            </div>
                            <div class="Modal_conteudo">
                                <p>Recorrência:teste</p>
                                <p>Prioridade:teste </p>
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
        
        function dataFormat(d){
   
            var d_split = d.split("/");
            var dia = d_split[0];
            var mes = d_split[1]-1; // diminui por 1 porque os meses começam com 0
            var ano = d_split[2];
         
            return [dia,mes,ano];
         }
        let botao_modal = document.getElementById("botao_Modal");
        botao_modal.onclick = ModalTarefa()
        window.onload = ListarTarefas()
        
        
