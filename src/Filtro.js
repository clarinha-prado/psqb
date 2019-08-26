/*******************************************************************************
 * Renderiza os campos de filtro da janela modal, para busca de bolsas disponí-
 * veis
 * 
 * @returns 
 */
import React from 'react';

class Filtro extends React.Component {
  constructor(props) {
    super(props);

    let bolsas = this.mock1();
    let cursos = new Set();
    let i;

    cursos.add("");
    for (i in bolsas) {
      cursos.add(bolsas[i].course.name);
    }
    this.state = {listaDeCursos: Array.from(cursos).sort()};
  }

  mock1() {
    var dados = require('./db.json');
    return (dados);
  }
  
  htmlListaDeCursos() {
    let htmlCode = [];
    
    for (let i of this.state.listaDeCursos) {
      htmlCode.push(<option value={i}>{i}</option>);
    }
    
    return htmlCode;
  }

  render() {
    let checkedBox = "fas fa-check-square fdisp__checkbox fdisp__checkbox_checked";
    let uncheckedBox = "far fa-square fdisp__checkbox fdisp__checkbox_unchecked";
    
    return (
      <React.Fragment>
        <section className="fdisp__container">
          <div className="fdisp__field-container">
            <label className="fdisp__field-caption">
              SELECIONE SUA CIDADE
            </label><br />
            <input type="text" 
              className="fdisp__input fdisp__field-content" 
              id="cidade" 
              onChange={this.props.onChange} />
          </div>

          <div className="fdisp__field-container">
            <label className="fdisp__field-caption">
              SELECIONE O CURSO <span className="fdisp__text-extra">DE SUA PREFERÊNCIA</span>
            </label><br />
            <select className="fdisp__select  fdisp__field-content" 
              id="curso" 
              onChange={this.props.onChange}>
              {this.htmlListaDeCursos()}
            </select>
            <i className="fa fa-chevron-down"></i>
          </div>

          <div className="fdisp__field-container">
            <label className="fdisp__field-caption">
              COMO VOCÊ QUER ESTUDAR?
            </label><br />
            <i className={this.props.state.presencial ? checkedBox : uncheckedBox}
               id="presencial"
               onClick={this.props.onChange}></i>
            <span className="fdisp__checkbox-text">Presencial</span>
            <i className={this.props.state.distancia ? checkedBox : uncheckedBox}
               id="distancia"
               onClick={this.props.onChange}></i>
            <span className="fdisp__checkbox-text">A distância</span>
          </div>

          <div className="fdisp__field-container">
            <label className="fdisp__field-caption">ATÉ QUANTO PODE PAGAR?</label><br />
              <span className="fdisp__moeda" id="valorFormatado">
                {this.formatarValor(this.props.state.valor)}
              </span>
              <input type="range" min="100" max="10000" id="valor"
                className="fdisp__slider" value={this.props.state.valor}
                onChange={this.props.onChange}/>
          </div>
        </section>
      </React.Fragment>
    );
  }
  
  formatarValor(valor) {
    var valorFormatado = valor.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return "R$"+valorFormatado;
  }
}
  
export default Filtro;