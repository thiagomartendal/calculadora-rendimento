class TitulosView {
  constructor(elemento) {
    this._elemento = elemento;
  }

  frame(titulo, valor, quantidade) {
    let divJanela = document.getElementById("jnl");
    divJanela.innerHTML = `<div id="dialog" title="Simular Valorização - Titulo ${titulo}">
    <label for="tempo">Tempo de giro</label>
    <p><input type="date" class="form-control" id="data-valor" required autofocus></p>
    <div id="rendimento"></div>
    </div>`;
    $("#dialog").dialog({
        autoOpen: true,
	    width: 400,
	    buttons: [
	        {
                text: "Ok",
			    click: function() {
                    let data = $('#data-valor').val();
                    let analise = new Analise(data, titulo, valor, quantidade);
                    if (analise.dataValida()) {
                        let quebrarCaracteres = data.split('-');
                        let rendimento = document.getElementById("rendimento");
                        rendimento.innerHTML = 'Rendimento total: R$ '+analise.avaliacao()+' até '+quebrarCaracteres[2]+'/'+quebrarCaracteres[1]+'/'+quebrarCaracteres[0];
                        //$("#dialog").remove();
                    }
		        }
            },
            {
			    text: "Fechar",
			    click: function() {
                    $("#dialog").remove();
                    $(this).dialog("close");
                    $(this).dialog("destroy");
		        }
	        }
        ]
    });
  }

  _template(model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>DATA</th>
            <th>QUANTIDADE</th>
            <th>VALOR</th>
            <th>VOLUME</th>
            <th>TIPO</th>
            <th>VALORIZAÇÃO</th><!-- Nova guia -->
            <th>AÇÕES</th>
          </tr>
        </thead>

        <tbody>
          ${model.titulos.map(t => 
            `
              <tr id="item-${t.id}">
                <td>${DateHelper.dataparaTexto(t.data)}</td>  
                <td>${t.quantidade}</td>  
                <td>${t.valor}</td>  
                <td>${t.volume}</td>
                <td>${t.tipo}</td>
                <td><!-- guia da valorização conforme tempo -->
                  <button class="btn btn-primary" type="button" onclick="tituloController.simular(event, '${t.tipo}', '${t.valor}', '${t.quantidade}')">Simular</button>
                </td>  
                <td>
                  <button class="btn btn-danger" type="button" onclick="tituloController.apaga(event)">Vender</button>
                </td>
              </tr>
            `
          ).join('')}
        </tbody>

        <tfoot>
          <td colspan="6"></td>
          <td class="total">${model.titulos.reduce((total, t) => total + t.volume, 0.0)}
          </td>
        </tfoot>
      </table>
    `;
  }

  update(model) {
    this._elemento.innerHTML = this._template(model);
  }
}
