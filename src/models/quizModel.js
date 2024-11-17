var database = require("../database/config");

function buscarResultadoQuiz(id_usuario, idQuiz) {

    var instrucaoSql = `SELECT resultado from quiz 
    WHERE fkUsuario = ${id_usuario} AND idQuiz = ${idQuiz}`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirBD(idQuiz, resultadoQuiz, id_usuario) {

    var instrucaoSql = `INSERT INTO quiz (idQuiz, resultado, fkUsuario) VALUES
    (${idQuiz, resultadoQuiz, id_usuario})`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarResultadoQuiz,
    inserirBD
}
