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
  render() {
    let enabled = "lista-disp__button lista-disp__button-add lista-disp__button-add_enabled";
    let disabled = "lista-disp__button lista-disp__button-add lista-disp__button-add_disabled";
    
    return (
      <React.Fragment>  
        <main id="modal" className="modal">

          <header id="header" className="modal__header">
            <p className="modal__close" onClick={this.props.onClickCancelar}>&times;</p>
          </header>
          <section className="modal__content">
            <div className="modal__title">Adicionar bolsa</div>
            <div className="modal__text">Filtre e adicione as bolsas de seu interesse.</div>
            
            <Filtro onChange={this.props.onChangeFiltro} 
              filtro={this.props.filtro}
            />
            <ListaDeDisponiveis semestre={this.props.semestre} 
              bolsas={this.props.bolsas}
              onClick = {this.props.onClickChecar}
              onChange = {this.props.onHeaderChange}/>
            
            <section className="lista-disp__button-container">
              <button  onClick={this.props.onClickCancelar} 
                className="lista-disp__button lista-disp__button-cancel">
                Cancelar
              </button>
              
              <button onClick={this.props.onClickAdicionar} 
                className= {this.props.qtdeSelecionada === 0 ? disabled : enabled}>
                Adicionar bolsa(s)
              </button>
              
            </section>
          </section>
        </main>
      </React.Fragment>
    );
  }
};
  
export default Modal;