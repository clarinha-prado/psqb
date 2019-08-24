import React from 'react';
import Semestres from './Semestres';
import ListaDeFavoritas from './ListaDeFavoritas';
import Modal from './Modal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({semestre: "todos"});

    this.handleClickSemestre = this.handleClickSemestre.bind(this);
  }

  handleClickSemestre(event) {
    this.setState({'semestre': event.target.name});
  }

    handleClickAdicionarBolsa(event) {
    document.getElementById('modal').setAttribute("style", "display: block;");
  }

  render() {
    return (
      <React.Fragment>
        <p className="cont__text cont__text_title">Bolsas favoritas</p>
        <p className="cont__text cont__text_regular">Adicione bolsas de cursos e faculdades do seu interesse e receba atualizações com as melhores ofertas disponíveis</p>

        <Semestres onClick={this.handleClickSemestre} selected={this.state.semestre} />
        <ListaDeFavoritas className="list-bfav" semestre={this.state.semestre} onClickAdicionar="{this."/>
        <Modal />
      </React.Fragment>
    );
  }  
}

export default App;
