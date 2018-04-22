// Classe que armazena todos os titulos que compramos/vendemos.
class ListaTitulo {
  constructor() {
    this._titulos = [] // Lista de títulos.
  }

  // Compra
  adiciona(titulo) {
    this._titulos.push(titulo);
  }

  // Vender tudo
  venderTudo() {
    this._titulos = [];
  }

  // Vender titulo especifico.
  vender(id) {
    for (let i = 0; i < this._titulos.length; i++) {
      if (id == this._titulos[i].id)
        this._titulos.splice(i, 1);
    }
  }

  // Lista de todos os titulos que possuimos no momento.
  get titulos() {
    return [].concat(this._titulos);  // Utilizamos o concat para passar uma cópia da lista, dessa forma não é possível alterar ela de fora.
  }
}