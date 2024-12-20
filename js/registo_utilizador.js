// -------------------------------------------------------------------------------------
// REGISTO
// -------------------------------------------------------------------------------------

// MENSAGENS
let mensagemErroRegistoNome = document.querySelector(".mensagemErroRegistoNome");
let mensagemErroRegistoEmail = document.querySelector(".mensagemErroRegistoEmail");
let mensagemErroRegistoSenha = document.querySelector(".mensagemErroRegistoSenha");
let mensagemErroRegistoConfirmacaoSenha = document.querySelector(".mensagemErroRegistoConfirmacaoSenha");
let mensagemErroRegistoObrigatorio = document.querySelector(".mensagemErroRegistoObrigatorio");

function limparMensagensErro() {
  mensagemErroRegistoNome.style.display = "none";
  mensagemErroRegistoNome.innerHTML = "";
  mensagemErroRegistoEmail.style.display = "none";
  mensagemErroRegistoEmail.innerHTML = "";
  mensagemErroRegistoSenha.style.display = "none";
  mensagemErroRegistoSenha.innerHTML = "";
  mensagemErroRegistoConfirmacaoSenha.style.display = "none";
  mensagemErroRegistoConfirmacaoSenha.innerHTML = "";
  mensagemErroRegistoObrigatorio.style.display = "none";
  mensagemErroRegistoObrigatorio.innerHTML = "";
}

// Obter os valores dos campos do formulário
function registarUtilizador(event) {

  event.preventDefault(); // Impede o envio padrão do formulário

  let vNome = document.querySelector("#nome").value;
  let vEmail = document.querySelector("#email").value;
  let vSenha = document.querySelector("#senha").value;
  let vConfirmacaoSenha = document.querySelector("#confirmacaoSenha").value;
  let vMorada = document.querySelector("#morada").value;
  let vCodigoPostal = document.querySelector("#codigoPostal").value;
  let vPais = document.querySelector("#pais").value;

  let nomeValido = validarNome(vNome);
  let emailValido = validarEmail(vEmail);
  let senhaValida = validarSenha(vSenha);
  let confirmacaoSenhaValida = validarConfirmacaoSenha(vSenha, vConfirmacaoSenha);

  if (nomeValido && emailValido && senhaValida && confirmacaoSenhaValida) {

    // Criar o objeto de novo utilizador
    let novoUtilizador = {
      nome: vNome,
      email: vEmail,
      senha: vSenha,
      morada: vMorada,
      codigoPostal: vCodigoPostal,
      pais: vPais,
      admin: false,
      ativo: false,
    };

    // Enviar a solicitação POST
    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(novoUtilizador),
    })
      .then(function (resposta) {
        if (resposta.ok) {
          return resposta.json();
        } else {
          return Promise.reject("Erro na recepção de dados!");
        }
      })
      .then((utlizador) => {

          // Limpar os campos do formulário se o utilizador for criado com sucesso
          document.querySelector("#nome").value = "";
          document.querySelector("#email").value = "";
          document.querySelector("#senha").value = "";
          document.querySelector("#confirmacaoSenha").value = "";
          document.querySelector("#morada").value = "";
          document.querySelector("#codigoPostal").value = "";
          document.querySelector("#pais").value = "";

          processaClick();

      })
      .catch((erro) => {
        console.log("Ocorreu um erro: " + erro);
      });

  } else {
    mensagemErroRegistoObrigatorio.style.display = "block";
    mensagemErroRegistoObrigatorio.innerHTML = "Todos os campos são de preenchimento obrigatório.";
  }

}

document.querySelector("#nome").addEventListener("input", limparMensagensErro);
document.querySelector("#email").addEventListener("input", limparMensagensErro);
document.querySelector("#senha").addEventListener("input", limparMensagensErro);
document.querySelector("#confirmacaoSenha").addEventListener("input", limparMensagensErro);
document.querySelector("#morada").addEventListener("input", limparMensagensErro);
document.querySelector("#codigoPostal").addEventListener("input", limparMensagensErro);
document.querySelector("#pais").addEventListener("input", limparMensagensErro);

let btRegistar = document.querySelector("#btRegistar")
btRegistar.addEventListener("click", registarUtilizador);


// -------------------------------------------------------------------------------------
// VALIDAÇÕES DE DADOS
// -------------------------------------------------------------------------------------

function validarNome(vNome) {
  if (vNome.trim() === "") {
    mensagemErroRegistoNome.style.display = "block";
    mensagemErroRegistoNome.innerHTML = "O nome é obrigatório.";
    return false;
  }
  return true;
}

function validarEmail(vEmail) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(vEmail)) {
    mensagemErroRegistoEmail.style.display = "block";
    mensagemErroRegistoEmail.innerHTML = "O e-mail tem um formato incorreto.";
    return false;
  }
  return true;
}

function validarSenha(vSenha) {
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
  if (!regex.test(vSenha)) {
    mensagemErroRegistoSenha.style.display = "block";
    mensagemErroRegistoSenha.innerHTML =
      "A senha deve ter no mínimo 8 caracteres, conter uma letra maiúscula, uma letra minúscula, um algarismo e um símbolo.";
    return false;
  }
  return true;
}

function validarConfirmacaoSenha(vSenha, vConfirmacaoSenha) {
  if (vSenha !== vConfirmacaoSenha) {
    mensagemErroRegistoConfirmacaoSenha.style.display = "block";
    mensagemErroRegistoConfirmacaoSenha.innerHTML = "É obrigatório confirmar a senha atual ou alterada";
    return false;
  }
  return true;
}


// MODAL
function processaClick() {
  document.querySelector(".modalForm").style.visibility = "visible";
  document.body.style.overflow = "hidden";
}

document.querySelector("#btConfirmacao").addEventListener("click", function () {
  window.location.href = "/html/index.html";
});

