/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <React.Fragment>  
        <main id="modal" class="modal">

          <header class="modal__header">
            <p class="modal__close">&times;</p>
          </header>
          <section class="modal__content">
            <div class="modal__title">Adicionar bolsa</div>
            <div class="modal__text">Filtre e adicione as bolsas de seu interesse.</div>
          <section class="fdisp__container">
            <div class="fdisp__field-container">
              <label class="fdisp__field-caption" for="fname">SELECIONE SUA CIDADE</label><br />
              <input type="text" class="fdisp__input fdisp__field-content" id="fname" name="cidade" value="São José dos Campos" />
            </div>
            
            <div class="fdisp__field-container">
              <label class="fdisp__field-caption" for="fname">SELECIONE O CURSO <span class="fdisp__text-extra">DE SUA PREFERÊNCIA</span></label><br />
                <select class="fdisp__select  fdisp__field-content" name="curso">
                  <option value="au">Australia</option>
                  <option value="ca">Canada</option>
                  <option value="usa">USA</option>
                </select>
                <i class="fa fa-chevron-down"></i>
            </div>
            
            <div class="fdisp__field-container">
              <label class="fdisp__field-caption" for="fname">COMO VOCÊ QUER ESTUDAR?</label><br />
                <i class="fas fa-check-square fdisp__checkbox fdisp__checkbox_checked"></i>
                <span class="fdisp__checkbox-text">Presencial</span>
                <i class="far fa-square fdisp__checkbox fdisp__checkbox_unchecked"></i>
                <span class="fdisp__checkbox-text">A distância</span>
            </div>
            
            <div class="fdisp__field-container">
              <label class="fdisp__field-caption" for="fname">ATÉ QUANTO PODE PAGAR?</label><br />
                <span class="fdisp__moeda">R$<span class="filtro__caption" id="valor"></span></span>
                <input type="range" min="100" max="10000" value="10000" class="fdisp__slider" id="mensalidade" />
            </div>
          </section>
          <section class="list-bdisp__container">
            <article class="list-bdisp__row">
              <div class="list-bdisp__text-header">Resultado:</div>
              <div class="list-bdisp__text-header list-bdisp__header-column2">Ordenar por</div>

              <div class="bdisp__select-container"> 
                <select class="bdisp__select-escola bdisp__select-text" name="curso">
                  <option value="au" class="bdisp__select-text">Nome da Faculdade</option>
                  <option value="ca" class="bdisp__select-text">Preço</option>
                  <option value="usa" class="bdisp__select-text">Curso</option>
                 </select>
                 <i class="fa fa-chevron-down"></i>
              </div>
            </article>

            <article class="list-bdisp__row">
              <div>
                <i class="fas fa-check-square bdisp__checkbox bdisp__checkbox_checked"></i>
              </div>
              <div class="bdisp__logo-container">
                <img class="bdisp__logo" src="./img/anhanguera.png" alt="Anhanguera"/>
              </div>
              <div class="bdisp__curso-container">Sistemas da Informação<br />
                <span class="bdisp__tipo-curso">Bacharelado</span>
              </div>
              <div class="bdisp__preco-container">Bolsa de 
                <span class="bdisp__preco">75%<br />R$ 425/mês</span>
             </div>
            </article>
          </section>            

          <section class="list-bdisp__button-container">
              <button class="list-bdisp__button list-bdisp__button-cancel">Cancelar</button>
              <button class="list-bdisp__button list-bdisp__button-add">Adicionar bolsa(s)</button>
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