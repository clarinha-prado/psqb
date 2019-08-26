import React from 'react';
import BolsaFavorita from './BolsaFavorita';

class ListaDeFavoritas extends React.Component {
  render() {
    return (
      <section className="lista-fav">
        {this.htmlAdicionarBolsa()}
        <React.Fragment>
          {this.htmlListaDeFavoritas()}
        </React.Fragment>
      </section>
    );
  }

  htmlAdicionarBolsa() {
    return (
      <section className="lista-fav__add-container">
        <i id="modal__button-open" 
          className="fas fa-plus-circle lista-fav__add-icon"
          onClick={this.props.onClickAbrir}>
        </i>
        <p className="lista-fav__add-title">Adicionar curso</p>
        <p className="lista-fav__add-text">Clique para adicionar bolsas de cursos do seu interesse</p>
      </section>
    );
  }
  
  htmlListaDeFavoritas() {
    var bolsas = this.props.bolsas;
    var htmlCode = []; 
    var i;

    for (i in bolsas) {
      if ((this.props.semestre === "todos") || (bolsas[i].enrollment_semester === this.props.semestre)) {
        htmlCode.push( <BolsaFavorita 
          indice={i} 
          dados={bolsas[i]} 
          onClick={this.props.onClickExcluir}/> 
        );
      }
    } 
    
    return htmlCode;
  }
};

export default ListaDeFavoritas;