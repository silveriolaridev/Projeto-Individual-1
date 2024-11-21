var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.get("/quantidadeResultados", function (req, res) {
    quizController.quantidadeResultados(req, res);
});

router.get("/kpiQuantidadeResultados", function (req, res) {
    quizController.kpiQuantidadeResultados(req, res);
});

router.get("/kpiMaiorIndice", function (req, res) {
    quizController.kpiMaiorIndice(req, res);
});

router.get("/kpiUltimoResultado/:id_usuario", function (req, res) {
    quizController.kpiUltimoResultado(req, res);
});


router.post("/gravarResultado", function (req, res) {
    quizController.inserirBD(req, res);
})

module.exports = router;