
function cadastrar() {
    // aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;


    // Verificando se há algum campo em branco
    if (nomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == ""
    ) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "Preencha todos os campos";

      finalizarAguardar();
      return false;
    } else if (nomeVar.length < 1) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "Nome com menos de um caractere. Insira um nome válido";

      finalizarAguardar();
      return false;
    } else if (!emailVar.includes('@') || !emailVar.includes('.')){
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "Email sem '@' ou '.'. Insira um e-mail válido";

      finalizarAguardar();
      return false;
    } else if (senhaVar.length < 6){
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "Senha com menos de 6 caracteres. Insira uma senha válida";

      finalizarAguardar();
      return false;
    } else if (confirmacaoSenhaVar != senhaVar){
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "As senhas não correspondem.";

      finalizarAguardar();
      return false;
    } else {
      setInterval(sumirMensagem, 5000);
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          cardErro.style.display = "block";

          mensagem_erro.innerHTML =
            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });

    return false;
  }

  // Listando empresas cadastradas 
  function listar() {
    fetch("/empresas/listar", {
      method: "GET",
    })
      .then(function (resposta) {
        resposta.json().then((empresas) => {
          empresas.forEach((empresa) => {
            listaEmpresasCadastradas.push(empresa);

            console.log("listaEmpresasCadastradas")
            console.log(listaEmpresasCadastradas[0].codigo_ativacao)
          });
        });
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  }

  function sumirMensagem() {
    cardErro.style.display = "none";
  }