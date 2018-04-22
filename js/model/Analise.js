class Analise {
    constructor(data, titulo, valor, quantidade) {
        this._data = data;
        this._titulo = titulo;
        this._valor = valor;
        this._quantidade = quantidade;
        this._formatarDados();
    }

    dataValida() {
        let dataAtual = new Date();
        let dia = dataAtual.getDate();
        let mes = dataAtual.getMonth()+1;
        let ano = dataAtual.getFullYear();
        let hoje = ano+'-0'+mes+'-'+dia;
        if (this._data <= hoje) {
            alert('Data inválida.');
            return false;
        }
        return true;
    }

    _formatarDados() {
        let dataSelecionada = this._data;
        let quebrarCaracteres = dataSelecionada.split('-');
        this._ano = quebrarCaracteres[0];
        this._mes = quebrarCaracteres[1];
    }

    avaliacao() {
        let hoje = new Date();
        let anoAtual = hoje.getFullYear();
        let mesAtual = hoje.getMonth()+1;
        let rendimentoAnual;
        let rendimentoMensal;
        let diferencaMeses = this._mes-mesAtual;
        let diferencaAnos = this._ano-anoAtual;
        if (diferencaAnos > 0) {        
            rendimentoMensal = parseInt(this._valor)+(this._valor*0.10)*((diferencaMeses)+12);
            rendimentoAnual = rendimentoMensal*diferencaAnos;
        } else if (diferencaAnos === 0) {
            if (diferencaMeses > 0) {
                rendimentoMensal = parseInt(this._valor)+(this._valor*0.10)*diferencaMeses;
                rendimentoAnual = rendimentoMensal;
            } else {
                alert('Data inválida.');
            }
        } else {
            alert('Data inválida.');
        }
        if (this._titulo === 'IPCA') {
            rendimentoAnual = rendimentoAnual+(rendimentoAnual*0.05);
        } else if (this._titulo === 'Selic') {
            rendimentoAnual = rendimentoAnual+(rendimentoAnual*0.10);
        } else if (this._titulo === 'Pré-fixado') {
            rendimentoAnual = rendimentoAnual+(rendimentoAnual*0.15);
        }
        return rendimentoAnual*this._quantidade;
    }
}
