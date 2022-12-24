const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router.get("/pessoas", PessoaController.pegaTodasAsPessoas);
router.get("/pessoas/:id", PessoaController.pegaUmaPessoa);
router.post("/pessoas", PessoaController.criaPessoa);
router.put("/pessoas/:id", PessoaController.atualizaPessoa);
router.get(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.pegaUmaMatricula
);
router.put(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.atualizaMatricula
);
router.delete(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.apagaMatricula
);
router.post("/pessoas/:estudanteId/matricula/", PessoaController.criaMatricula);
router.delete("/pessoas/:id", PessoaController.apagaPessoa);

module.exports = router;
