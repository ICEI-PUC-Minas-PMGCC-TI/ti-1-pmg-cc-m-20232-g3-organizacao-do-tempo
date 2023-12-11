user = document.getElementById("content-my-profile");

const nome = usuarioCorrente.nome;
const login = usuarioCorrente.login;
const email = usuarioCorrente.email;

document.addEventListener('DOMContentLoaded',function(){
    
    user.innerHTML = `
    <div class="container-info-meu-perfil">
        <div class="title-meu-perfil">
            Meu Perfil
        </div>
        <div class="content-meu-perfil">
            <div class="nome-meu-perfil">
                Nome: <span id="nome-perfil">${nome}</span>
            </div>
            <div class="login-meu-perfil">
                Login: <span id="login-perfil">${login}</span>
            </div>
            <div class="email-meu-perfil">
                Email: <span id="email-perfil">${email}</span>
            </div>
        </div>
    </div>
    `

})