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


  let labels = ["Energético", "Tranquilo", "Criativo", "Único"];


  let dados = {
    labels: labels,
    datasets: [
      {
        label: 'Energético',
        data: [],
        backgroundColor: 'rgba(208, 94, 168, 0.8)', 
        borderColor: 'rgba(208, 94, 168, 1)',
        borderWidth: 1
      },
      {
        label: 'Tranquilo',
        data: [],
        backgroundColor: 'rgba(102, 153, 255, 0.8)', 
        borderColor: 'rgba(102, 153, 255, 1)', 
        borderWidth: 1
      },
      {
        label: 'Criativo',
        data: [],
        backgroundColor: 'rgba(102, 204, 178, 0.8)', 
        borderColor: 'rgba(102, 204, 178, 1)',
        borderWidth: 1
      },
      {
        label: 'Único',
        data: [],
        backgroundColor: 'rgba(255, 223, 128, 0.8)', 
        borderColor: 'rgba(255, 223, 128, 1)', 
        borderWidth: 1
        
      }
    ]
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

  const config = {
    type: 'bar',
    data: dados,
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#FFFFFF',
            font: {
              size: 14,
            },
          },
        },
        title: {
          display: true,
          text: 'Índice de Resultados Gerais',
          color: '#FFFFFF',
          font: {
            size: 25,
            weight: 'bold',
          },
          padding: {
            top: 10,
            bottom: 20,
          },
        },
      },
      scales: {
        x: {
          stacked: true, 
          ticks: {
            color: '#FFFFFF',
            font: {
              size: 16,
            },
          },
          grid: {
            display: false, 
          },
        },
        y: {
          ticks: {
            color: '#FFFFFF',
            font: {
              size: 14,
            },
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
      },
      barPercentage: 0.3, 
      categoryPercentage: 0.8, 
    },
  };

  let myChart = new Chart(
    document.getElementById(`graficoBarra`),
    config
  );

}



function kpiQuantidadeResultadosNoPainel() {
  fetch(`/quiz/kpiQuantidadeResultados/`, { method: 'GET' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

          kpi_qtd.innerHTML = `<p class="indicador"><i class="fa-solid fa-file-alt"></i> Total de resultados</p> <b class="resultado">${resposta.resultado}</b>`

        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
    });
}

function kpiMaiorIndiceNoPainel() {
  fetch(`/quiz/kpiMaiorIndice/`, { method: 'GET' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

          kpi_maior.innerHTML = `<p class="indicador"><i class="fa-solid fa-percent"></i>Estilo com mais resultados</p> <b class="resultado">${resposta.resultadoNome}</b>`

        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
    });
}


function kpiUltimoResultadoNoPainel() {
  fetch(`/quiz/kpiUltimoResultado/${sessionStorage.ID_USUARIO}`, { method: 'GET' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos ==========================: ${JSON.stringify(resposta)}`);

          kpi_resultado_user.innerHTML = `<p class="indicador"><i class="fa-solid fa-clock"></i>Seu último resultado</p> <b class="resultado">${resposta.resultadoNome}</b>`

        });
      } else {
        console.error('Nenhum dado encontrado ou erro na API');
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
    });
}