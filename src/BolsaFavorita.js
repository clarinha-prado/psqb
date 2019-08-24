/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import Estrelas from './Estrelas';

class BolsaFavorita extends React.Component {
  render() {
    var bolsa = this.props.dados;
    
    return (
      <article className="bfav-container">
        <img className="bfav-logo"src="./img/estacio.png" alt="Anhanguera" />
        <p className="bfav__escola">{bolsa.university.name}</p>
        <p className="bfav__curso">{bolsa.course.name}</p>
        <p>
        <span className="bfav__avaliacao">{bolsa.university.score}</span>
        <Estrelas score={bolsa.university.score} />
        </p>
        <hr className="b__separator" />
        <p className="bfav__escola">{bolsa.course.kind} &middot; {bolsa.course.shift}</p>
        <p className="bfav__dt-inicio">Início das aulas em: {bolsa.start_date}</p>
        <hr className="b__separator" />
         {(bolsa.enabled) ? this.htmlBolsaDisponivel(bolsa) : this.htmlBolsaIndisponivel(bolsa)}
         {this.htmlBotoes(bolsa)}
      </article>
           );
  }

  htmlBolsaDisponivel(bolsa) {
    return(
        <React.Fragment>
          <p className="bfav__text-bold">Mensalidade com o Quero Bolsa:</p>
          <p className="bfav__preco">
            R${(bolsa.full_price).toLocaleString('pt-br', {minimumFractionDigits: 2})}
          </p>
          <p className="bfav__oferta">
            R${(bolsa.price_with_discount).toLocaleString('pt-br', {minimumFractionDigits: 2})} 
            <span className="bfav__text-oferta">/ mês</span></p>
        </React.Fragment>
      );
  }

  htmlBolsaIndisponivel(bolsa) {
    return(
        <React.Fragment>
          <p className="bfav__text-title-indisp">Bolsa indisponível.</p>
          <p className="bfav__text-aviso-indisp">Entre em contato com nosso<br />atendimento para saber mais.</p>
        </React.Fragment>
                );
  }
  
  htmlBotoes(bolsa) {
    var estiloBotao;
    var labelBotao;
    
    estiloBotao = (bolsa.enabled) ? "bfav__button-oferta_enabled" : "bfav__button-oferta_disabled";
    labelBotao = (bolsa.enabled) ? "Ver oferta" : "Indisponível";
    
    return(
        <React.Fragment>
          <button className="bfav__button bfav__button-excluir"
                  name={"Excluir".concat(this.props.indice) }
                  onClick={this.props.onClick}>
                  Excluir
          </button>
          <button className={`bfav__button bfav__button-oferta ${estiloBotao}`}>{labelBotao}</button>
        </React.Fragment>
            );
  }
  
};

export default BolsaFavorita;