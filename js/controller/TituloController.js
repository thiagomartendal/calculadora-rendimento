class TituloController {
  constructor() {
    // Busca dos valores na View
    const $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._inputTipo = $("#tipo");
    
    // Instancia das outras classes
    this._listaTitulos = new ListaTitulo();
    this._titulosView = new TitulosView($('#titulosView'));

    // Chamamos a view pela primeira vez, vazia.
    this._titulosView.update(this._listaTitulos);
    this._id = 0;   // ID para o controle dos titulos
  }


  // Metodo para comprar um novo título.
  adiciona(event) {
    event.preventDefault();

    this._listaTitulos.adiciona(this._criaTitulo());
    this._id++;
    this._titulosView.update(this._listaTitulos);  // Atualizamos a view quando um novo método é criado.
    this._limpaFormulario();   // Limpa o formulario apos criar um novo titulo.
  }

  _criaTitulo() {
    return new Titulo(
      DateHelper.textoParaData(this._inputData.value),  // Utilizamos a classe Helper pra tratar a Data
      this._inputQuantidade.value,
      this._inputValor.value,
      this._inputTipo.value,
      this._id
    );
  }

  simular(event, titulo, valor, quantidade) {
    event.preventDefault();
    this._titulosView.frame(titulo, valor, quantidade);
  }

  // Método de venda de um titulo.
  apaga(event) {
    event.preventDefault();
    
    // Pega a TR e o ID dela.
    const td = event.target.parentNode;
    const target = td.parentNode;
    const targetID = target.id.split('-');
    const id = targetID[1];
    
    target.classList.add('fadeOut');
    
    this._listaTitulos.vender(id);
    
    setTimeout(() => {
      this._titulosView.update(this._listaTitulos);
    }, 500);

  }

  // Metodo de venda de todos os titulos.
  apagaTudo() {
    this._listaTitulos.venderTudo();
    this._titulosView.update(this._listaTitulos);
  }

  _limpaFormulario() {
    const form = document.querySelector('form');
    form.reset();
    this._inputData.focus();
  }
}
