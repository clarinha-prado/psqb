import React from 'react';

class ListaDeDisponiveis extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleHeaderChange = this.handleHeaderChange.bind(this);
  }
  
  handleHeaderChange(event) {
    let bolsas = (this.props.bolsas).slice();

    switch (event.target.value) {
      case 'Nome da Faculdade':
        break;
      case 'Curso':
        break;
      case 'Preço':
        break;
      default:
        break;
    }
    this.setState({listaDeDisponiveis: bolsas});
  }

  render() {
    return (
      <React.Fragment>  
        <section className="lista-disp__container">
          <article className="lista-disp__row">
            <div className="lista-disp__text-header">Resultado:</div>
            <div className="lista-disp__text-header lista-disp__header-column2">Ordenar por</div>

            <div className="bdisp__select-container"> 
              <select className="bdisp__select-escola bdisp__select-text" 
                onChange={this.handleHeaderChange}
                id="ordenar">
                <option value="au" className="bdisp__select-text">Nome da Faculdade</option>
                <option value="ca" className="bdisp__select-text">Preço</option>
                <option value="usa" className="bdisp__select-text">Curso</option>
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

    let bolsas = this.filtrarBolsas(this.props.bolsas);
    let htmlCode = []; 
    let i;

    for (i in bolsas) {
      htmlCode.push( 
        <article key={i} className="lista-disp__row">
          <div>
            <i className={bolsas[i].selected ? checkedBox : uncheckedBox}
              onClick={this.props.onClick} id={bolsas[i].id}>
            </i>
          </div>
          <div className="bdisp__logo-container">
            <img className="bdisp__logo" src="./img/anhanguera.png" alt="Anhanguera"/>
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
    return htmlCode;
  }

  filtrarBolsas(bolsas) {
    let bolsasFiltradas = [];
    let i;

    for (i in bolsas) {
      if ((this.props.semestre === "todos" || this.props.semestre === bolsas[i].enrollment_semester) &&
          (this.props.state.cidade === ""  || (this.props.state.cidade).toUpperCase() === (bolsas[i].campus.city).toUpperCase()) &&
          (this.props.state.curso === "" || this.props.state.curso === bolsas[i].course.name) &&
          ((this.props.state.presencial && bolsas[i].course.kind === "Presencial") || 
          (this.props.state.distancia && bolsas[i].course.kind === "EaD")) &&
          (this.props.state.valor >= Number(bolsas[i].price_with_discount))) {
            bolsasFiltradas.push(bolsas[i]);
      }
    }
    return bolsasFiltradas;
  }
}

export default ListaDeDisponiveis;