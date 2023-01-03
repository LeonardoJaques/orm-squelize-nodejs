const database = require("../models");
class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }
  async pegaTodosOsRegitros() {
    return database[this.nomeDoModelo].findAll();
  }
  async pegaUmRegistro(id) {
    return database[this.nomeDoModelo];
  }
  async criaRegistro(dados) {
    return database[this.nomeDoModelo];
  }
  async atualizaRegistro(dadosAtualizados, id) {
    return database[this.nomeDoModelo];
  }
  async apagaRegistro(id) {
    return database[this.nomeDoModelo];
  }

  async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
    return database[this.nomeDoModelo].update(dadosAtualizados, {
      where: { id: id },
      transacao,
    });
  }
  async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
    return database[this.nomeDoModelo].update(dadosAtualizados, {
      where: { ...where },
      transacao,
    });
  }
}
module.exports = Services;
