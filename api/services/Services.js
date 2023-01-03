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
}
module.exports = Services;
