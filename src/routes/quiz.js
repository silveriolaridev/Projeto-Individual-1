var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.get("/:idQuiz/:id_usuario", function (req, res) {
    quizController.buscarResultadoQuiz(req, res);
});

router.get("/:idQuiz/:resultadoQuiz/:id_usuario", function (req, res) {
    quizController.inserirBD(req, res);
})

module.exports = router;