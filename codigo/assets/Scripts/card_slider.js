
const templete = document.createElement('template')

templete.innerHTML = `
    <div class="container">
        <div class="scrool">
            <div class="card-tarefa" >                           
                <div class="card">
                <h5 class="card-title">Aula Natação</h5>
                <p class="card-text">Seg a Sex<br>08:00 às 09:00</p>
                </div>
            </div>
            <div class="card-tarefa" >                           
                <div class="card">
                <h5 class="card-title">Aula Natação</h5>
                <p class="card-text">Seg a Sex<br>08:00 às 09:00</p>
                </div>
            </div>
            <div class="card-tarefa" >                           
                <div class="card">
                <h5 class="card-title">Aula Natação</h5>
                <p class="card-text">Seg a Sex<br>08:00 às 09:00</p>
                </div>
            </div>
            <div class="card-tarefa" >                           
                <div class="card">
                <h5 class="card-title">Aula Natação</h5>
                <p class="card-text">Seg a Sex<br>08:00 às 09:00</p>
                </div>
            </div>
            <div class="card-tarefa" >                           
                <div class="card">
                <h5 class="card-title">Aula Natação</h5>
                <p class="card-text">Seg a Sex<br>08:00 às 09:00</p>
                </div>
            </div>
            <div class="card-tarefa" >                           
                <div class="card">
                <h5 class="card-title">Aula Natação</h5>
                <p class="card-text">Seg a Sex<br>08:00 às 09:00</p>
                </div>
            </div>
            <div class="card-tarefa" >                           
                <div class="card">
                <h5 class="card-title">Aula Natação</h5>
                <p class="card-text">Seg a Sex<br>08:00 às 09:00</p>
                </div>
            </div>
        </div>

    </div>
`



class cardSldier extends HTMLElement {
    constructor () {
        super()

        this.attachShadow({mode: 'open'})

        const CSS = document.createElement('style')
        CSS.innerHTML=`@import \'assets/Styles/style.css\'`
        
        //const botao = document.createElement('script')
        //botao.src = 'botao.js'

        this.shadowRoot.appendChild(CSS)
        //this.shadowRoot.appendChild(botao)

        this.shadowRoot.appendChild(templete.content.cloneNode(true))
    }

}

window.customElements.define('card-slider',cardSldier)