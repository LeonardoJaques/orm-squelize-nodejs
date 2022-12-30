const database = require("../models");
const Sequelize = require("sequelize");
class PessoaController {
  static async pegaTodasAsPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await database.Pessoas.findAll();
      return res.status(200).json(pessoasAtivas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.scope("todos").findAll();
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
  static async restauraPessoa(req, res) {
    const { id } = req.params;
    const where = { where: { id: Number(id) } };

    try {
      await database.Pessoas.restore(where);
      return res.status(200).json({ mensagem: `id ${id} restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async restauraMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;

    const where = {
      where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
    };

    try {
      await database.Matriculas.restore(where);
      return res.status(200).json({ mensagem: `id ${matriculaId} restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaMatriculas(req, res) {
    const { estudanteId } = req.params;
    const where = { where: { id: Number(estudanteId) } };
    try {
      const pessoa = await database.Pessoas.findOne(where);
      const matriculas = await pessoa.getAulasMatriculadas();
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaMatriculasPorTurma(req, res) {
    const { turmaId } = req.params;
    const where = {
      where: { turma_id: Number(turmaId), status: "confirmado" },
      limit: 20,
      order: [["estudante_id", "DESC"]],
    };
    try {
      const todasAsMatriculas = await database.Matriculas.findAndCountAll(
        where
      );
      return res.status(200).json(todasAsMatriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaTurmasLotadas(req, res) {
    const lotacaoTurma = 2;
    const where = {
      where: {
        status: "confirmado",
      },
      attributes: ["turma_id"],
      group: ["turma_id"],
      having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`),
    };
    try {
      const turmasLotadas = await database.Matriculas.findAndCountAll(where);
      return res.status(200).json(turmasLotadas.count);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async cancelaPessoa(req, res) {
    const { estudanteId } = req.params;
    try {
      await database.Pessoas.update(
        { ativo: false },
        { where: { id: Number(estudanteId) } }
      );
      await database.Matriculas.update(
        { status: "cancelado" },
        { where: { estudante_id: Number(estudanteId) } }
      );
      return res.status(200).json({
        message: `matriculas ref. estudante ${estudanteId} canceladas`,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
module.exports = PessoaController;
