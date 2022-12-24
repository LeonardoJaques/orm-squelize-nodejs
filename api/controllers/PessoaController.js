const database = require("../models");
class PessoaController {
  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll();
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaUmaPessoa(req, res) {
    const { id } = req.params;
    try {
      const umaPessoa = await database.Pessoas.findOne({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json(umaPessoa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async criaPessoa(req, res) {
    const novaPessoa = req.body;
    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
      return res.status(200).json(novaPessoaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async atualizaPessoa(req, res) {
    const novasInfo = req.body;
    const { id } = req.params;
    const where = { where: { id: Number(id) } };
    try {
      await database.Pessoas.update(novasInfo, where);
      const pessoaAtualizada = await database.Pessoas.findOne(where);
      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async apagaPessoa(req, res) {
    const { id } = req.params;
    const where = { where: { id: Number(id) } };
    try {
      await database.Pessoas.destroy(where);
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  //http://localhost:3000/pessoas/:estudanteId/matricula/:matriculaId
  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const umaMatricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res.status(200).json(umaMatricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async criaMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const novaMatriculaCriada = await database.Matriculas.create(
        novaMatricula
      );
      return res.status(200).json(novaMatriculaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaMatricula(req, res) {
    const novasInfo = req.body;
    const { estudanteId, matriculaId } = req.params;
    const where = {
      where: {
        id: Number(matriculaId),
        estudante_id: Number(estudanteId),
      },
    };
    try {
      await database.Matriculas.update(novasInfo, where);
      const pessoaMatricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
        },
      });
      return res.status(200).json(pessoaMatricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async apagaMatricula(req, res) {
    const { matriculaId } = req.params;
    const where = { where: { id: Number(matriculaId) } };

    try {
      await database.Matriculas.destroy(where);
      return res.status(200).json({ mensagem: `id ${matriculaId} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
module.exports = PessoaController;
