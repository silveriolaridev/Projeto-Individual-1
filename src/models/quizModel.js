var database = require("../database/config");

function buscarResultadoQuiz(id_usuario, idQuiz) {

    var instrucaoSql = `SELECT resultado from quiz 
    WHERE fkUsuario = ${id_usuario} AND idQuiz = ${idQuiz}`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function quantidadeResultados() {

var instrucaoSql = `SELECT count(resultado) as Quantidade,
CASE 
WHEN resultado LIKE '%Kpop%' THEN 'Energético'
WHEN resultado LIKE '%Jazz%' THEN 'Tranquilo'
WHEN resultado LIKE '%Indie%' THEN 'Criativo'
WHEN resultado LIKE '%Rock%' THEN 'Único'
ELSE 'Sem resultado'
END AS resultados
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

module.exports = {
    buscarResultadoQuiz,
    inserirBD,
    quantidadeResultados
}
