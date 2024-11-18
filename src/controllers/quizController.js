var quizModel = require("../models/quizModel");

function buscarResultadoQuiz(req, res) {

    
    var idQuiz = req.params.idQuiz;
    var id_usuario = req.params.id_usuario;


    quizModel.buscarResultadoQuiz(id_usuario, idQuiz ).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o resultado do quiz.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function inserirBD(req, res) {

    var id_usuario = req.body.usuarioServer;
    var resultadoQuiz = req.body.resultadoServer;

    console.log(`Recuperando resultado em tempo real`);

    quizModel.inserirBD(resultadoQuiz, id_usuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos resultados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarResultadoQuiz,
    inserirBD
}