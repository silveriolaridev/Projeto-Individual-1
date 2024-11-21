var quizModel = require("../models/quizModel");



function quantidadeResultados(req, res) {

    quizModel.quantidadeResultados().then(function (resultado) {
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

function kpiQuantidadeResultados(req, res){
    quizModel.kpiQuantidadeResultados().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o resultado do quiz.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function kpiMaiorIndice(req, res){
    quizModel.kpiMaiorIndice().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o resultado do quiz.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function kpiUltimoResultado(req, res){

    var id_usuario = req.params.id_usuario;
    console.log('Id do usuario:=======================================', id_usuario)
    quizModel.kpiUltimoResultado(id_usuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o resultado do quiz.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    inserirBD,
    quantidadeResultados,
    kpiQuantidadeResultados,
    kpiMaiorIndice,
    kpiUltimoResultado
}