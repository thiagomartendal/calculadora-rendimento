// Criamos classes da mesma maneira que no Java.
class Titulo {
  // Método construtor, utilizamos o _ antes do atributo pra indicar que é um atributo privado.
  constructor(data, quantidade, valor, tipo, id) {
    this._data = new Date(data.getTime());
    this._quantidade = quantidade;
    this._valor = valor;
    this._tipo = tipo;
    this._id = id;
    Object.freeze(this);  // Deixamos o objeto imutável.
  }
  
  // Getters da nossa classe.
  get tipo() {
    return this._tipo;
  }

  get data() {
    return new Date(this._data.getTime());
  }

  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }

  get volume() {
    return this._valor * this._quantidade;
  }

  get id() {
    return this._id;
  }
}