const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router
  .get("/pessoas", PessoaController.pegaTodasAsPessoas)
  .get("/pessoas/ativas", PessoaController.pegaPessoasAtivas)
  .get("/pessoas/:id", PessoaController.pegaUmaPessoa)
  .get(
    "/pessoas/:estudanteId/matricula/:matriculaId",
    PessoaController.pegaUmaMatricula
  )
  .get("/pessoas/:estudanteId/matricula", PessoaController.pegaMatriculas)
  .get(
    "/pessoas/matricula/:turmaId/confirmadas",
    PessoaController.pegaMatriculasPorTurma
  )
  .get("/pessoas/matricula/lotadas", PessoaController.pegaTurmasLotadas)
  .post("/pessoas", PessoaController.criaPessoa)
  .post("/pessoas/:id/restaura", PessoaController.restauraPessoa)
  .post(
    "/pessoas/:estudanteId/matricula/:matriculaId/restaura",
    PessoaController.restauraMatricula
  )
  .post("/pessoas/:estudanteId/matricula/", PessoaController.criaMatricula)
  .post("/pessoas/:estudanteId/cancela", PessoaController.cancelaPessoa)
  .put("/pessoas/:id", PessoaController.atualizaPessoa)
  .put(
    "/pessoas/:estudanteId/matricula/:matriculaId",
    PessoaController.atualizaMatricula
  )
  .delete(
    "/pessoas/:estudanteId/matricula/:matriculaId",
    PessoaController.apagaMatricula
  )
  .delete("/pessoas/:id", PessoaController.apagaPessoa);

module.exports = router;
