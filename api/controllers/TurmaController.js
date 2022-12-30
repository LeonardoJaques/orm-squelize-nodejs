const database = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class TurmaController {
  static async pegaTodasAsTurmas(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};
    data_inicial || data_final ? (where.data_inicio = {}) : null;
    data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;
    data_final ? (where.data_inicio[Op.lte] = data_final) : null;

    try {
      const todasAsTurmas = await database.Turmas.findAll({ where });
      return res.status(200).json(todasAsTurmas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaUmaTurma(req, res) {
    const { id } = req.params;
    try {
      const pegaUmTurma = await database.Turmas.findOne({
        where: {
          id,
        },
      });
      return res.status(200).json(pegaUmTurma);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async criaTurma(req, res) {
    const novoTurma = req.body;
    try {
      const novoTurmaCriado = await database.Turmas.create(novoTurma);
      return res.status(200).json(novoTurmaCriado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async atualizaTurma(req, res) {
    const novasInfo = req.body;
    const { id } = req.params;
    const where = { where: { id: Number(id) } };
    try {
      await database.Turmas.update(novasInfo, where);
      const TurmasAtualizada = await database.Turmas.findOne(where);
      return res.status(200).json(TurmasAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async apagaTurma(req, res) {
    const { id } = req.params;
    const where = { where: { id: Number(id) } };
    try {
      await database.Turmas.destroy(where);
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async restauraTurma(req, res) {
    const { id } = req.params;
    try {
      await database.Turmas.restore({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `id ${id} restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
module.exports = TurmaController;
