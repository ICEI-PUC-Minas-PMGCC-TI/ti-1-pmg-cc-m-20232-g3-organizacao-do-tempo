const carregarJSON = async (filePath = "") => {
    const data = await fetch(filePath)
      .then(async (res) => {
        return await res.json();
      })
      .then((data) => {
        return data;
      });
    return data;
  };
  
  const cards = document.getElementById("parte-metodos");
  
  const init = async () => {
    const data = await carregarJSON("assets/scripts/data/data.json")
    console.log(data);
    data.metodosEstudo.forEach(element => {
      cards.innerHTML += `
  
      <div class="modal fade" id="exampleModalCenter-${element.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">${element.nome}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body-${element.id} modal-text">
          ${element.descricao}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" >Fechar</button>
          </div>
        </div>
      </div>
    </div>
  
        <div class="div-item" data-toggle="modal" data-target="#exampleModalCenter-${element.id}">
          <div class="title-item">
              ${element.nome}
          </div>
      </div>
      `;
  
    });
  
  }
  
  window.addEventListener('load', () => init())