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

}



function kpiQuantidadeResultadosNoPainel(){
  fetch(`/quiz/kpiQuantidadeResultados/`, { method: 'GET' })
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        
        kpi_qtd.innerHTML = `Quantidade total de resultados: ${resposta.resultado}`

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
  .catch(function (error) {
    console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
  });
}

function kpiMaiorIndiceNoPainel(){
  fetch(`/quiz/kpiMaiorIndice/`, { method: 'GET' })
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        
        kpi_maior.innerHTML = `Estilo com mais resultados: ${resposta.resultadoNome}`

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
  .catch(function (error) {
    console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
  });
}


function kpiUltimoResultadoNoPainel(){
  fetch(`/quiz/kpiUltimoResultado/${sessionStorage.ID_USUARIO}`, { method: 'GET' })
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos ==========================: ${JSON.stringify(resposta)}`);
        
        kpi_resultado_user.innerHTML = `Seu ultimo resultado: ${resposta.resultadoNome}`

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
  .catch(function (error) {
    console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
  });
}