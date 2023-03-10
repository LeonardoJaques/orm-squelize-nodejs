// const database = require("../models");
// const Services = require("../services/Services");
// const niveisServices = new Services("Niveis");
class NivelController {
  static async pegaTodosOsNiveis(req, res) {
    try {
      const todosOsNiveis = await niveisServices.pegaTodosOsRegitros();
      return res.status(200).json(todosOsNiveis);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async pegaUmNivel(req, res) {
    const { id } = req.params;
    try {
      const pegaUmNivel = await database.Niveis.findOne({
        where: {
          id,
        },
      });
      return res.status(200).json(pegaUmNivel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async criaNivel(req, res) {
    const novoNivel = req.body;
    try {
      const novoNivelCriado = await database.Niveis.create(novoNivel);
      return res.status(200).json(novoNivelCriado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async atualizaNivel(req, res) {
    const novasInfo = req.body;
    const { id } = req.params;
    const where = { where: { id: Number(id) } };
    try {
      await database.Niveis.update(novasInfo, where);
      const niveisAtualizada = await database.Niveis.findOne(where);
      return res.status(200).json(niveisAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async apagaNivel(req, res) {
    const { id } = req.params;
    const where = { where: { id: Number(id) } };
    try {
      await database.Niveis.destroy(where);
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async restauraNivel(req, res) {
    const { id } = req.params;
    try {
      await database.Niveis.restore({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `id ${id} restaurado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
module.exports = NivelController;
