function obterDados() {
  fetch(`/quiz/quantidadeResultados/`, { method: 'GET' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          

          plotarGrafico(resposta);
        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
    });
}

function plotarGrafico(resposta) {

  console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels = ["Energético", "Tranquilo", "Criativo", "Único"];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
      labels: labels,
      datasets: [{
          label: 'Energético',
          data: [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
      },
      {
          label: 'Tranquilo',
          data: [],
          fill: false,
          borderColor: 'rgb(199, 52, 52)',
          tension: 0.1
      },
      {
        label: 'Criativo',
        data: [],
        fill: false,
        borderColor: 'rgb(199, 52, 52)',
        tension: 0.1
    },
    {
        label: 'Único',
        data: [],
        fill: false,
        borderColor: 'rgb(199, 52, 52)',
        tension: 0.1
    }]
  };

  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  // for (i = 0; i < resposta.length; i++) {
  //     var registro = resposta[i];
  //     console.log("Registro: " + registro.resultados)
  //     labels.push(registro.resultados);
  //     console.log(labels);

  //     if(labels[i] == 'Energético'){
  //       dados.datasets[i].data.push(registro.Quantidade);
  //     } else if (labels[i] == 'Tranquilo'){
  //       dados.datasets[i].data.push(registro.Quantidade);
  //     } else if (labels[i] == 'Criativo'){
  //       dados.datasets[i].data.push(registro.Quantidade);
  //     } else {
  //       dados.datasets[i].data.push(registro.Quantidade);
  //     }
    
  //     console.log(registro.Quantidade);
  // }

  for (var i = 0; i < resposta.length; i++) {
    var dadoAtual = resposta[i];
    var labelIndex = labels.indexOf(dadoAtual.resultados); 
 
    dados.datasets[labelIndex].data[labelIndex] = dadoAtual.Quantidade; 
   
  }

  console.log("Dados finais para plotagem:");
  console.log(dados);

  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels)
  console.log('Dados:')
  console.log(dados.datasets)
  console.log('----------------------------------------------')

  // Criando estrutura para plotar gráfico - config
  const config = {
      type: 'bar',
      data: dados,
  };

  // Adicionando gráfico criado em div na tela
  let myChart = new Chart(
      document.getElementById(`graficoBarra`),
      config
  );

  setTimeout(() => atualizarGrafico(myChart), 2000);
}







// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico(resultados) {



    fetch(`/medidas/tempo-real/${idAquario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                obterdados();
                // alertar(novoRegistro, idAquario);
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);

                let avisoCaptura = document.getElementById(`avisoCaptura${idAquario}`)
                avisoCaptura.innerHTML = ""


                if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].momento_grafico)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

                    dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                    dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}