const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router
  .get("/pessoas", PessoaController.pegaTodasAsPessoas)
  .get("/pessoas/:id", PessoaController.pegaUmaPessoa)
  .post("/pessoas", PessoaController.criaPessoa)
  .post("/pessoas/:id/restaura", PessoaController.restauraPessoa)
  .put("/pessoas/:id", PessoaController.atualizaPessoa)
  .get(
    "/pessoas/:estudanteId/matricula/:matriculaId",
    PessoaController.pegaUmaMatricula
  )
  .put(
    "/pessoas/:estudanteId/matricula/:matriculaId",
    PessoaController.atualizaMatricula
  )
  .delete(
    "/pessoas/:estudanteId/matricula/:matriculaId",
    PessoaController.apagaMatricula
  )
  .post(
    "/pessoas/:estudanteId/matricula/:matriculaId/restaura",
    PessoaController.restauraMatricula
  )
  .post("/pessoas/:estudanteId/matricula/", PessoaController.criaMatricula)
  .delete("/pessoas/:id", PessoaController.apagaPessoa);

module.exports = router;
