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

    this.state = {listaDeCursos: []};
  }

  htmlListaDeCursos() {
    let htmlCode = [];
    
    for (let i of this.state.listaDeCursos) {
      htmlCode.push(<option value={i}>{i}</option>);
    }
    
    return htmlCode;
  }

  /*******************************************************************************
 * Carrega lista de cursos via http-get no estado do componente
 * 
 * @returns -
 */
  componentDidMount() {
  let thisReference = this;
  let url = 'https://testapi.io/api/redealumni/scholarships'

  fetch(url)
    .then(function(response){
      if (response.status >= 400) {
        throw new Error("Não foi possível ler lista de bolsas.");
      }
      return response.json();
    })
    .then(function(data) {
      let cursos = new Set();
      cursos.add("");
      for (let i in data) {
        cursos.add(data[i].course.name);
      }
      thisReference.setState({listaDeCursos: Array.from(cursos).sort()});
    });
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
            <i className={this.props.filtro.presencial ? checkedBox : uncheckedBox}
               id="presencial"
               onClick={this.props.onChange}></i>
            <span className="fdisp__checkbox-text">Presencial</span>
            <i className={this.props.filtro.distancia ? checkedBox : uncheckedBox}
               id="distancia"
               onClick={this.props.onChange}></i>
            <span className="fdisp__checkbox-text">A distância</span>
          </div>

          <div className="fdisp__field-container">
            <label className="fdisp__field-caption">ATÉ QUANTO PODE PAGAR?</label><br />
              <span className="fdisp__moeda" id="valorFormatado">
                {this.formatarValor(this.props.filtro.valor)}
              </span>
              <input type="range" min="100" max="10000" id="valor"
                className="fdisp__slider" value={this.props.filtro.valor}
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