
// Página inicial de Login
const LOGIN_URL = "login.html";
var db_usuarios = [];
var ultimoID_cad = 0

fetch('https://jsonserver-tiaw.1499144.repl.co/Usuarios')
    .then(response => response.json())
    .then(data => {
        db_usuarios = data;
        ultimoID_cad = encontrarUltimoId(data)
    })
    .catch(error => {
        console.error('Erro ao ler Usuários via API JSONServer:', error);
        displayMessage("Erro ao ler Usuários");
    });

// Objeto para o usuário corrente
var usuarioCorrente = {};


// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
function initLoginApp () {
    // PARTE 1 - INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA
    var usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }
};


// Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial
function loginUser (login, senha) {
    
    // Verifica todos os itens do banco de dados de usuarios 
    // para localizar o usuário informado no formulario de login
    for (var i = 0; i < db_usuarios.length; i++) {
        var usuario = db_usuarios[i];
        
        // Se encontrou login, carrega usuário corrente e salva no Session Storage
        if (login == usuario.login && senha == usuario.senha) {
            usuarioCorrente.id = usuario.id;
            usuarioCorrente.login = usuario.login;
            usuarioCorrente.email = usuario.email;
            usuarioCorrente.nome = usuario.nome;
            // Salva os dados do usuário corrente no Session Storage, mas antes converte para string
            sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));

            // Retorna true para usuário encontrado
            return true;
        }
    }

    // Se chegou até aqui é por que não encontrou o usuário e retorna falso
    return false;
}

// Apaga os dados do usuário corrente no sessionStorage
function logoutUser () {
    usuarioCorrente = {};
    sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));
    window.location = LOGIN_URL;
}

function addUser (nome, login, senha, email) {
    
    // Cria um objeto de usuario para o novo usuario 
    let newId = ultimoID_cad += 1;
    let usuario = { "id": newId, "login": login, "nome": nome, "email": email,"senha": senha };
    
    // Inclui o novo usuario no banco de dados baseado em JSON
    try{
        const cadastro = fetch('https://jsonserver-tiaw.1499144.repl.co/Usuarios',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(usuario)
        });

        if (!cadastro.ok) {
            throw new Error(`Erro na requisição: ${cadastro.status}`);
        }
    
        const data =  response.json();
        console.log('Usuário cadastrado com sucesso:', data);
        
    }catch (error) {
        console.error('Erro ao cadastrar usuário:', error.message);
    }
    
}

function encontrarUltimoId(jsonData) {
    let ultimoId = 0;
  
    for (const usuario of jsonData) {
      if (usuario.id > ultimoId) {
        ultimoId = usuario.id;
      }
    }
  
    return ultimoId;
}

function setUserPass () {

}


// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp ();