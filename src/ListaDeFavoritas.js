/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import BolsaFavorita from './BolsaFavorita';

class ListaDeFavoritas extends React.Component {

  constructor(props) {
    super(props);

    this.handleClickExcluirBolsa = this.handleClickExcluirBolsa.bind(this);
    this.handleClickAdicionarBolsa = this.handleClickAdicionarBolsa.bind(this);

    // mock1
    var localStorage = window.localStorage;
    localStorage.setItem('ListaDeFavoritas',  JSON.stringify(this.mock1()));

    // lê repositório local
    var listaDeFavoritas = JSON.parse(localStorage.getItem('ListaDeFavoritas'));
    this.state = ({'ListaDeFavoritas': listaDeFavoritas});
}

  //excluir bolsa da coleção de bolsas e atualizar repositório local
  handleClickExcluirBolsa(event) {
    let dadosAtuais = this.state.ListaDeFavoritas;
    
    let botao = event.target.name;
    let indice = botao.substring(7, botao.length);
    dadosAtuais.splice(indice, 1);
    
    this.setState({'ListaDeFavoritas': dadosAtuais});
  }
  
  mock1() {
    var dados = require('./db.json');
    return (dados);
  }
  
  render() {
    return (
      <section className="list-bfav">
        {this.htmlAdicionarBolsa()}
        <React.Fragment>
          {this.htmlListaDeFavoritas()}
        </React.Fragment>
      </section>
    );
  }

  htmlAdicionarBolsa() {
    return (
            <React.fragment>
              <section className="list-bfav__add-container">
                  <i id="modal__button-open" 
                     className="fas fa-plus-circle list-bfav__add-icon"
                     onClick={this.handleClickAdicionar}>
                  </i>
                  <p className="list-bfav__add-title">Adicionar curso</p>
                  <p className="list-bfav__add-text">Clique para adicionar bolsas de cursos do seu interesse</p>
              </section>
              <Modal   
              </React.fragment>
              );
  }
  
  htmlListaDeFavoritas() {
    var bolsas = this.state.ListaDeFavoritas;
    var htmlCode = []; 
    var i;

    for (i in bolsas) {
      console.log(bolsas[i].enrollment_semester);
      if ((this.props.semestre === "todos") || (bolsas[i].enrollment_semester === this.props.semestre)) {
        htmlCode.push( <BolsaFavorita 
          indice={i} 
          dados={bolsas[i]} 
          onClick={this.handleClickExcluirBolsa}/> 
        );
      }
    } 
    
    return htmlCode;
  }
};

export default ListaDeFavoritas;