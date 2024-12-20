let mensagemErroRegistoNome = document.querySelector(
  ".mensagemErroRegistoNome"
);
let mensagemErroRegistoEmail = document.querySelector(
  ".mensagemErroRegistoEmail"
);
let mensagemErroRegistoSenha = document.querySelector(
  ".mensagemErroRegistoSenha"
);
let mensagemErroRegistoConfirmacaoSenha = document.querySelector(
  ".mensagemErroRegistoConfirmacaoSenha"
);

window.addEventListener("DOMContentLoaded", function () {
  let emailUtilizador = sessionStorage.getItem("email");

  fetch(`${url}`)
    .then(function (resposta) {
      if (resposta.ok) {
        return resposta.json();
      } else {
        return Promise.reject("Erro na recepção de dados!");
      }
    })
    .then((utilizadores) => {
      for (let utilizador of utilizadores) {
        if (emailUtilizador === utilizador.email) {

          displayUtilizadorLogado();

          // Verificar se a senha existe antes de usar a função repeat
          let senhaOculta = "";
          if (utilizador.senha) {
            senhaOculta = "*".repeat(utilizador.senha.length);
          }

          // Dados do utilizador
          document.getElementById(
            "nomeUtilizador"
          ).textContent = `Nome: ${utilizador.nome}`;
          document.getElementById(
            "emailUtilizador"
          ).textContent = `E-mail: ${utilizador.email}`;
          document.getElementById(
            "senhaUtilizador"
          ).textContent = `Senha: ${senhaOculta}`;
          document.getElementById(
            "moradaUtilizador"
          ).textContent = `Morada: ${utilizador.morada}`;
          document.getElementById(
            "codigoPostalUtilizador"
          ).textContent = `Código Postal: ${utilizador.codigoPostal}`;
          document.getElementById(
            "paisUtilizador"
          ).textContent = `País: ${utilizador.pais}`;

          // Adicionar evento de click ao botão "Alterar informação"
          let btAlterar = document.getElementById("btAlterar");

          btAlterar.addEventListener("click", function () {

            document.getElementById("perfil").style.display = "none";

            document.getElementById("atualizarPerfil").style.display = "block";

            // Atualizar os elementos no form #atualizarPerfil
            document.getElementById(
              "novoNomeUtilizador"
            ).innerHTML = `<label for="inputNome">Nome: </label><input type="text" id="inputNome" value="${utilizador.nome}" autofocus>`;
            document.getElementById(
              "novoEmailUtilizador"
            ).innerHTML = `<label for="inputEmail">E-mail: </label><input type="email" id="inputEmail" value="${utilizador.email}" autofocus>`;
            document.getElementById(
              "novaSenhaUtilizador"
            ).innerHTML = `<label for="inputSenha">Senha: </label><input type="password" id="inputSenha" value="${utilizador.senha}" autofocus>`;
            document.getElementById(
              "novaConfirmacaoSenhaUtilizador"
            ).innerHTML = `<label for="inputConfirmacaoSenha">Confirme a senha: </label><input type="password" id="inputConfirmacaoSenha" value="${utilizador.senha}" autofocus>`;
            document.getElementById(
              "novaMoradaUtilizador"
            ).innerHTML = `<label for="inputMorada">Morada: </label><input type="text" id="inputMorada" value="${utilizador.morada}" autofocus>`;
            document.getElementById(
              "novoCodigoPostalUtilizador"
            ).innerHTML = `<label for="inputCodigoPostal">Código Postal: </label><input type="text" id="inputCodigoPostal" value="${utilizador.codigoPostal}" autofocus>`;
            document.getElementById(
              "novoPaisUtilizador"
            ).innerHTML = `<label for="inputPais">País: </label><input type="text" id="inputPais" value="${utilizador.pais}" autofocus>`;

            // Adicionar evento de clique ao botão "Guardar Informações"
            let btGuardar = document.getElementById("btGuardar");

            btGuardar.addEventListener("click", function (event) {

              event.preventDefault(); // Impede o envio padrão do formulário

              // Obter os novos valores dos campos de entrada
              let novoNome = document.getElementById("inputNome").value;
              let novoEmail = document.getElementById("inputEmail").value;
              let novaSenha = document.getElementById("inputSenha").value;
              let novaConfirmacaoSenha = document.getElementById(
                "inputConfirmacaoSenha"
              ).value;
              let novaMorada = document.getElementById("inputMorada").value;
              let novoCodigoPostal =
                document.getElementById("inputCodigoPostal").value;
              let novoPais = document.getElementById("inputPais").value;

              let nomeValido = validarNome(novoNome);
              let emailValido = validarEmail(novoEmail);
              let senhaValida = validarSenha(novaSenha);
              let confirmacaoSenhaValida = validarConfirmacaoSenha(novaSenha, novaConfirmacaoSenha);

              if (
                nomeValido &&
                emailValido &&
                senhaValida &&
                confirmacaoSenhaValida
              ) {

                // Dados atualizados
                let dadosAtualizados = {
                  nome: nomeValido,
                  email: emailValido,
                  senha: senhaValida,
                  morada: novaMorada,
                  codigoPostal: novoCodigoPostal,
                  pais: novoPais,
                  ativo: true,
                };

                // PUT para atualizar os dados no servidor
                fetch(`${url}/${utilizador.id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(dadosAtualizados),
                }).then(function (resposta) {
                  if (resposta.ok) {
                    return resposta.json();
                  } else {
                    return Promise.reject("Erro na recepção de dados!");
                  }
                });
              }
            });
          });

          break;
        }
      }

      logOut();
    })
    .catch((erro) => {
      console.log("Ocorreu um erro: " + erro);
    });
});

// -------------------------------------------------------------------------------------
// VALIDAÇÕES DE DADOS
// -------------------------------------------------------------------------------------

function validarNome(vNome) {
  if (vNome.trim() === "") {
    mensagemErroRegistoNome.style.display = "block";
    mensagemErroRegistoNome.innerHTML = "O nome é obrigatório.";
    return null;
  }
  return vNome;
}

function validarEmail(vEmail) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(vEmail)) {
    mensagemErroRegistoEmail.style.display = "block";
    mensagemErroRegistoEmail.innerHTML = "O e-mail tem um formato incorreto.";
    return null;
  }
  return vEmail;
}

function validarSenha(vSenha) {
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
  if (!regex.test(vSenha)) {
    mensagemErroRegistoSenha.style.display = "block";
    mensagemErroRegistoSenha.innerHTML =
      "A senha deve ter no mínimo 8 caracteres, conter uma letra maiúscula, uma letra minúscula, um algarismo e um símbolo.";
    return null;
  }
  return vSenha;
}

function validarConfirmacaoSenha(vSenha, vConfirmacaoSenha) {
  if (vSenha !== vConfirmacaoSenha) {
    mensagemErroRegistoConfirmacaoSenha.style.display = "block";
    mensagemErroRegistoConfirmacaoSenha.innerHTML =
      "É obrigatório confirmar a senha atual ou alterada";
    return null;
  }
  return vConfirmacaoSenha;
}
