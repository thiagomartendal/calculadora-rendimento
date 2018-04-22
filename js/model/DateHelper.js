// Classe de serviço para trabalhar com datas.
class DateHelper {
  constructor() {
    throw new Error("DateHelper não deve ser instanciada.") // Fazemos que seja uma classe abstrata.
  }

  static dataparaTexto(data) {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

  static textoParaData(texto) {

    if (!/\d{4}-\d{2}-\d{2}/.test(texto))
      throw new Error('Deve utilizar o formato AAAA-MM-DD');

    return new Date(...texto.split('-').map((item, indice) => item - indice % 2))
  }

}