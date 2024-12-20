// -------------------------------------------------------------------------------------
// ICON LUPA - ANIMAÇÃO + CAIXA PESQUISA
// -------------------------------------------------------------------------------------

let iconLupa = document.getElementById("iconLupa");
let caixaPesquisa = document.getElementById("caixaPesquisa");

iconLupa.addEventListener("click", function () {
  let valorDisplayConteudo = window
    .getComputedStyle(caixaPesquisa)
    .getPropertyValue("display");

  if (valorDisplayConteudo === "none") {
    caixaPesquisa.style.display = "block";
    setTimeout(function () {
      caixaPesquisa.style.width = "300px";
      caixaPesquisa.focus();
    }, 500);
  } else {
    caixaPesquisa.style.width = "0";
    setTimeout(function () {
      caixaPesquisa.style.display = "none";
    }, 500);
  }
});

document.addEventListener("click", function (event) {
  if (
    !iconLupa.contains(event.target) &&
    !caixaPesquisa.contains(event.target) &&
    caixaPesquisa.style.display === "block"
  ) {
    caixaPesquisa.style.width = "0";
    setTimeout(function () {
      caixaPesquisa.style.display = "none";
    }, 500);
  }
});

// -------------------------------------------------------------------------------------
// LOGIN
// -------------------------------------------------------------------------------------

// MODAL
function processaClick() {
  document.querySelector(".modal").style.visibility = "visible";
  document.body.style.overflow = "hidden";
}

let iconLogin = document.getElementById("iconLogin");
iconLogin.addEventListener("click", processaClick);

document.querySelector(".btFecha").addEventListener("click", function () {
  limpaDadosModal();
});

function limpaDadosModal() {
  document.querySelector(".modal").style.visibility = "hidden";
  document.body.style.overflow = "auto";
  mensagemErroModal.style.display = "none";
  dialogBox.style.height = "130px";
  document.querySelector("#emailModal").value = "";
  document.querySelector("#senhaModal").value = "";
}

function displayUtilizadorLogado() {
  document.querySelector("#iconLogin").style.display = "none";
  document.querySelector("#iconRegisto").style.display = "none";
  document.querySelector("#iconPerfil").style.display = "block";
  document.querySelector("#iconLogout").style.display = "block";
}

function displayUtilizadorDeslogado() {
  document.querySelector("#iconLogin").style.display = "block";
  document.querySelector("#iconRegisto").style.display = "block";
  document.querySelector("#iconPerfil").style.display = "none";
  document.querySelector("#iconLogout").style.display = "none";
  mensagemBoasVindas.style.display = "none";
}

function logOn(utilizadorPesquisado) {
  mensagemBoasVindas.style.display = "block";
  mensagemBoasVindas.innerText = `Bem-vindo(a), ${utilizadorPesquisado.nome}`;

  displayUtilizadorLogado();
  window.localStorage.href = "/html/index.html"; 
}

// -------------------------------------------------------------------------------------
// VALIDAÇÃO CREDENCIAIS
// -------------------------------------------------------------------------------------

let url = "http://localhost:3000/utilizadores";
let btValidar = document.getElementById("btValidar");
let mensagemErroModal = document.querySelector(".mensagemErroModal");
let dialogBox = document.querySelector(".dialogBox");
let mensagemBoasVindas = document.getElementById("bemVindo");

btValidar.addEventListener("click", function () {
  // Valores do email e senha do formulário
  let email = document.getElementById("emailModal").value;
  let senha = document.getElementById("senhaModal").value;
  

  // Verificação das credenciais (email e senha)
  if (email && senha) {
    fetch(`${url}`)
      .then(function (resposta) {
        console.log(resposta);
        if (resposta.ok) {
          return resposta.json();
        } else {
          return Promise.reject("Erro na recepção de dados!");
        }
      })
      .then((data) => {
        // console.log(data); // Exibe os dados retornados do servidor

        let utilizadores = data; // Array de utilizadores retornado pelo servidor

        let utilizadorPesquisado = utilizadores.find(
          (utilizador) =>
            utilizador.email === email &&
            utilizador.senha === senha &&
            utilizador.ativo === true
        );

        if (utilizadorPesquisado) {
          limpaDadosModal();

          // Armazena dados do utilizador na sessionStorage
          sessionStorage.setItem("email", utilizadorPesquisado.email);

          logOn(utilizadorPesquisado);
          perfil();
          logOut();
          
        } else {
          mensagemErroModal.style.display = "block";
          dialogBox.style.height = "150px";
          mensagemErroModal.innerHTML = "Utilizador inexistente!";
        }
      })
      .catch((erro) => {
        console.log("Ocorreu um erro: " + erro);
      });
  } else {
    mensagemErroModal.style.display = "block";
    mensagemErroModal.innerHTML =
      "Os dois campos são de preenchimento obrigatório!";
    dialogBox.style.height = "150px";
  }

});

// -------------------------------------------------------------------------------------
// ICON LOGOUT
// -------------------------------------------------------------------------------------

function logOut() {
  let iconLogout = document.getElementById("iconLogout");

  iconLogout.addEventListener("click", function () {

    // Remover as chaves da sessionStorage
    sessionStorage.removeItem("email");
    displayUtilizadorDeslogado();

    window.location.href = "/html/index.html"; // Redirecionar para a página principal
  });
}

// -------------------------------------------------------------------------------------
// ICON PERFIL
// -------------------------------------------------------------------------------------

function perfil() {
  let iconPerfil = document.getElementById("iconPerfil");

  iconPerfil.addEventListener("click", function () {
    window.location.href = "/html/perfil.html";
  });
}
