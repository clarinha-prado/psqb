/******************************************************************************* 
 * Grupo de botões para seleção dos semestres: "todos", 2019.2, 2020.1, 2020.2. 
 * ...
 * 
 * @returns Semestre 
 */

import React from 'react';

class Semestre extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 'botoes': this.definirProximosSemestres() };
  }
  
  render() {
    return (
      <section className="sems">
        <div className="sems__border">
          <button name='todos' 
            onClick={this.props.onClick}
            className={`sems__button sems__button_first
              ${this.props.selected === "todos" ? " sems__button_selected" : " sems__button_unselected"}`}>
            Todos os semestres
          </button>
          
          <button name={this.state.botoes[0].id} 
            onClick={this.props.onClick}
            className={`sems__button 
              ${this.props.selected === this.state.botoes[0].id ? " sems__button_selected" : " sems__button_unselected"}`}>
            {this.state.botoes[0].label}
          </button>
          
          <button name={this.state.botoes[1].id} 
            onClick={this.props.onClick}
            className={`sems__button sems__button_last
              ${this.props.selected === this.state.botoes[1].id ? " sems__button_selected" : " sems__button_unselected"}`}>
            {this.state.botoes[1].label}
          </button>
        </div>
      </section>
           );
  }
  
  definirProximosSemestres() {
    let dataAtual = new Date();
    let anoAtual = dataAtual.getFullYear();
    let mesAtual = dataAtual.getMonth() + 1;
    let prox1, prox2;
    
    // define próximo semestre
    if ((mesAtual >= 1) && (mesAtual <= 6)) {
      prox1 = {'id': anoAtual.toString() + ".2"};
      Object.assign(prox1, {'label': (2).toString() + "º semestre de " + anoAtual.toString()});
    } else {
      prox1 = {'id': (anoAtual + 1).toString() + ".1"};
      Object.assign(prox1, {'label': (1).toString() + "º semestre de " + (anoAtual + 1).toString()});
    }

    // define semestre após próximo semestre
    if ((mesAtual >= 1) && (mesAtual <= 6)) {
      prox2 = {'id': (anoAtual + 1).toString() + ".1"};
      Object.assign(prox2, {'label': (1).toString() + "º semestre de " + (anoAtual + 1).toString()});
    } else {
      prox2 = {'id': (anoAtual + 1).toString() + ".2"};
      Object.assign(prox2, {'label': (2).toString() + "º semestre de " + (anoAtual + 1).toString()});
    }

    return [prox1, prox2];
  }
};

export default Semestre;