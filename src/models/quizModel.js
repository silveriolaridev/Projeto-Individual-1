var database = require("../database/config");

function quantidadeResultados() {

var instrucaoSql = `SELECT 
CASE 
WHEN resultado LIKE '%Kpop%' THEN 'Energético'
WHEN resultado LIKE '%Jazz%' THEN 'Tranquilo'
WHEN resultado LIKE '%Indie%' THEN 'Criativo'
WHEN resultado LIKE '%Rock%' THEN 'Único'
ELSE 'Sem resultado'
END AS resultados, count(resultado) as Quantidade
from quiz
group by resultado;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirBD(resultadoQuiz, id_usuario) {

    var instrucaoSql = `INSERT INTO quiz (resultado, fkUsuario) VALUES
    ('${resultadoQuiz}', ${id_usuario})`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiQuantidadeResultados(){
    var instrucaoSql = `
    SELECT count(resultado) AS resultado FROM quiz;
`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiMaiorIndice(){
    var instrucaoSql = `
      SELECT 
    CASE 
        WHEN resultado LIKE '%Kpop%' THEN 'Energético'
        WHEN resultado LIKE '%Jazz%' THEN 'Tranquilo'
        WHEN resultado LIKE '%Indie%' THEN 'Criativo'
        WHEN resultado LIKE '%Rock%' THEN 'Único'
        ELSE 'Sem resultado'
        END AS resultadoNome,
        count(resultado) AS quantidadeResultado
            FROM quiz
            group by resultadoNome order by quantidadeResultado desc limit 1;
`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function kpiUltimoResultado(id_usuario){
    var instrucaoSql = `
   SELECT 
    CASE 
        WHEN resultado LIKE '%Kpop%' THEN 'Energético'
        WHEN resultado LIKE '%Jazz%' THEN 'Tranquilo'
        WHEN resultado LIKE '%Indie%' THEN 'Criativo'
        WHEN resultado LIKE '%Rock%' THEN 'Único'
        ELSE 'Sem resultado'
        END AS resultadoNome
            FROM quiz
            where fkUsuario = ${id_usuario}
            order by dataHora desc limit 1
`

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
    inserirBD,
    quantidadeResultados,
    kpiQuantidadeResultados,
    kpiMaiorIndice,
    kpiUltimoResultado
}
