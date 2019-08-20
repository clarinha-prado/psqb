/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';

class BolsaFavorita extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
}
  
  handleClick(event) {
    if(event.target.name === 'Excluir') {
      alert("excluir");
    }
    
    //excluir bolsa da coleção de bolsas e atualizar repositório local
  }
  
  render() {
    var bolsa = this.props;
    console.log(bolsa);
    
    return (
      <article className="bfav-container">
        <img className="bfav-logo"src="./img/estacio.png" alt="Anhanguera"/>
        <p className="bfav__escola">ppppppppppppp</p>
        <p className="bfav__curso">Arquitetura e Urbanismo</p>
        <p className="bfav__avaliacao">3.8
          <i className="fas fa-star bfav__estrelas"></i>
          <i className="fas fa-star bfav__estrelas"></i>
          <i className="fas fa-star bfav__estrelas"></i>
          <i className="fas fa-star-half-alt bfav__estrelas"></i>
          <i className="far fa-star bfav__estrelas"></i>
        </p>
        <hr className="b__separator" />
        <p className="bfav__escola">PRESENCIAL &middot; NOITE</p>
        <p className="bfav__dt-inicio">Início das aulas em: 01/07/2019</p>
        <hr className="b__separator" />
        <p className="bfav__text-title-indisp">Bolsa indisponível.</p>
        <p className="bfav__text-aviso-indisp">Entre em contato com nosso<br />atendimento para saber mais.</p>
        <button name="Excluir" 
                onClick={this.handleClick}
                className="bfav__button bfav__button-excluir">
                Excluir
        </button>
        <button className="bfav__button bfav__button-oferta bfav__button-oferta_disabled">Indisponível</button>
      </article>
     );
  }
};

export default BolsaFavorita;