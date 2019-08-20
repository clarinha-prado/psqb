/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import BolsaFavorita from './BolsaFavorita';

class BolsasFavoritas extends React.Component {
  constructor(props) {
    super(props);

    // mock1
    var localStorage = window.localStorage;
    localStorage.setItem('bolsasFavoritas',  JSON.stringify(this.mock1()));
    var str = this.mock1();
    console.log(str);

    // lê repositório local
    var listBfav = JSON.parse(localStorage.getItem('bolsasFavoritas'));
    this.state = ({'bolsasFavoritas': listBfav});
}
  
  mock1() {
    return (
      [
        {
          "full_price": 2139.64,
          "price_with_discount": 706.08,
          "discount_percentage": 67.0,
          "start_date": "01/08/2019",
          "enrollment_semester": "2019.2",
          "enabled": true,
          "course": {
            "name": "Engenharia Mecânica",
            "kind": "Presencial",
            "level": "Bacharelado",
            "shift": "Noite"
          },
          "university": {
            "name": "UNIP",
            "score": 4.5,
            "logo_url": "https://www.tryimg.com/u/2019/04/16/unip.png"
          },
          "campus": {
            "name": "Jardim das Indústrias",
            "city": "São José dos Campos"
          }
        },
        {
          "full_price": 1227.05,
          "price_with_discount": 515.36,
          "discount_percentage": 58.0,
          "start_date": "01/08/2019",
          "enrollment_semester": "2019.2",
          "enabled": true,
          "course": {
            "name": "Jornalismo",
            "kind": "Presencial",
            "level": "Bacharelado",
            "shift": "Noite"
          },
          "university": {
            "name": "UNIP",
            "score": 4.5,
            "logo_url": "https://www.tryimg.com/u/2019/04/16/unip.png"
          },
          "campus": {
            "name": "Água Branca",
            "city": "São Paulo"
          }
        }
      ]
    );
  }
  
  render() {
    var bolsas = this.state.bolsasFavoritas;
    const str = bolsas.map((bolsa) => 
      <article className="bfav-container">
        <img className="bfav-logo"src="./img/estacio.png" alt="Anhanguera"/>
        <p className="bfav__escola">{bolsa.full_price}</p>
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
      </article>);

    
    
    return (
            <section class="list-bfav__add-container">
                <i id="modal__button-open" class="fas fa-plus-circle list-bfav__add-icon"></i>
                <p class="list-bfav__add-title">Adicionar curso</p>
                <p class="list-bfav__add-text">Clique para adicionar bolsas de cursos do seu interesse</p>
            </section>

            {str}   
     );
  }
};


export default BolsasFavoritas;