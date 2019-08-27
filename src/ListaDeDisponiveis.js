/*******************************************************************************
 * Renderiza uma tabela com a lista de todas as bolsas disponíveis no semestre
 * selecionado.
 * 
 * Filtra as bolsas exibidas, de acordo com os valores que o usuário configurou
 * nos campos de filtro: cidade, curso, presencial, à distância e valor.
 * 
 * @returns ListaDeDisponiveis
 */
import React from 'react';

class ListaDeDisponiveis extends React.Component {
  render() {
    return (
      <React.Fragment>  
        <section className="lista-disp__container">
          <article className="lista-disp__row">
            <div className="lista-disp__text-header">Resultado:</div>
            <div className="lista-disp__text-header lista-disp__header-column2">Ordenar por</div>

            <div className="bdisp__select-container"> 
              <select className="bdisp__select-escola bdisp__select-text" 
                onChange={this.props.onChange}
                id="ordenar">
                <option value="Nome da Faculdade" className="bdisp__select-text">Nome da Faculdade</option>
                <option value="Curso" className="bdisp__select-text">Nome do Curso</option>
                <option value="Valor" className="bdisp__select-text">Mensalidade</option>
               </select>
               <i className="fa fa-chevron-down"></i>
            </div>
          </article>
            {this.htmlListaDeDisponiveis()}
        </section>            
      </React.Fragment>
    );
  }

  htmlListaDeDisponiveis() {
    let checkedBox = "fas fa-check-square fdisp__checkbox fdisp__checkbox_checked";
    let uncheckedBox = "far fa-square fdisp__checkbox fdisp__checkbox_unchecked";

    let bolsas = this.props.bolsas;
    let htmlCode = []; 
    let i;

    for (i in bolsas) {
      if (bolsas[i].visible) {
        htmlCode.push( 
          <article key={i} className="lista-disp__row">
            <div>
              <i className={bolsas[i].selected ? checkedBox : uncheckedBox}
                onClick={this.props.onClick} id={bolsas[i].id}>
              </i>
            </div>
            <div className="bdisp__logo-container">
              <img className="bdisp__logo" src={bolsas[i].university.logo_url} alt={bolsas[i].university.name}/>
            </div>
            <div className="bdisp__curso-container">{bolsas[i].course.name}<br />
              <span className="bdisp__tipo-curso">{bolsas[i].course.level}</span>
            </div>
            <div className="bdisp__preco-container">Bolsa de 
              <span className="bdisp__preco">
                {Math.round(bolsas[i].discount_percentage)}%<br />
                R${(bolsas[i].price_with_discount).toLocaleString('pt-br', {minimumFractionDigits: 2})}/mês</span>
            </div>
          </article>
        );
      }
    }
    return htmlCode;
  }
}

export default ListaDeDisponiveis;