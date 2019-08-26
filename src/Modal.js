/*******************************************************************************
 * Renderiza a janela modal com o filtro e a lista de bolsas disponíveis.
 * Armazena os valores dos campos do filtro no estado e os repassa para filtra-
 * gem das bolsas.
 * 
 * @returns Modal, Filtro, ListaDeDisponiveis
 */
import React from 'react';
import Filtro from './Filtro';
import ListaDeDisponiveis from './ListaDeDisponiveis';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleOnChangeFiltro = this.handleOnChangeFiltro.bind(this);
    
    this.state = {cidade: "", 
      curso: "",
      presencial: true, 
      distancia: true, 
      valor: 10000};
  }
  
  handleOnChangeFiltro(event) {
    switch (event.target.id) {
      case 'cidade':
        this.setState({cidade: event.target.value});
        break;
      case 'curso':
        this.setState({curso: event.target.value});
        break;
      case 'presencial':
        this.setState({presencial: !this.state.presencial});
        break;
      case 'distancia':
        this.setState({distancia: !this.state.distancia});
        break;
      case 'valor':
        this.setState({valor: event.target.value});
        break;
      default:
        break;
    }
    console.log(this.state);
  }
  
  render() {
    window.scrollTo(0,0);
    return (
      <React.Fragment>  
        <main id="modal" className="modal">

          <header id="header" className="modal__header">
            <p className="modal__close" onClick={this.props.onClickCancelar}>&times;</p>
          </header>
          <section className="modal__content">
            <div className="modal__title">Adicionar bolsa</div>
            <div className="modal__text">Filtre e adicione as bolsas de seu interesse.</div>
            
            <Filtro onChange={this.handleOnChangeFiltro} state={this.state}/>
            <ListaDeDisponiveis state={this.state} 
              semestre={this.props.semestre} 
              bolsas={this.props.bolsas}
              onClick = {this.props.onClickChecar}
              onChange = {this.props.onHeaderChange}/>
            
            <section className="lista-disp__button-container">
              <button  onClick={this.props.onClickCancelar} className="lista-disp__button lista-disp__button-cancel">Cancelar</button>
              <button onClick={this.props.onClickAdicionar} className="lista-disp__button lista-disp__button-add">Adicionar bolsa(s)</button>
            </section>
          </section>
        </main>
      </React.Fragment>
    );
  }
  
  formatarValor() {
    //() => {separador-milhar(y.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
    var slider = document.getElementById("mensalidade");
    var sliderValue = document.getElementById("valor");
    var valorFormatado = slider.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    sliderValue.innerHTML = valorFormatado;

    slider.oninput = function() {
      var valorFormatado = slider.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      sliderValue.innerHTML = valorFormatado;
    }
  }
}
  
export default Modal;