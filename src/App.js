import React from 'react';
import Semestre from './Semestre';
import ListaDeFavoritas from './ListaDeFavoritas';
import Modal from './Modal';
import Header from './Header';

class App extends React.Component {
  constructor(props) {
    super(props);
    // mock1
    var localStorage = window.localStorage;
    localStorage.setItem('ListaDeFavoritas',  JSON.stringify(this.mock1()));

    // lê repositório local
    var listaDeFavoritas = JSON.parse(localStorage.getItem('ListaDeFavoritas'));
    this.state = {semestre: "todos",
                  listaDeDisponiveis: this.carregarListaDeDisponiveis(),
                  listaDeFavoritas: listaDeFavoritas};
    
    this.handleClickCheckBolsa = this.handleClickCheckBolsa.bind(this);
    this.handleClickSemestre = this.handleClickSemestre.bind(this);
    this.handleClickAbrirModal = this.handleClickAbrirModal.bind(this);
    this.handleClickFecharModal = this.handleClickFecharModal.bind(this);
    this.handleClickAdicionarBolsas = this.handleClickAdicionarBolsas.bind(this);
    this.handleClickExcluirBolsa = this.handleClickExcluirBolsa.bind(this);
    this.handleHeaderChange = this.handleHeaderChange.bind(this);
 }

  handleHeaderChange(event) {
    let bolsas = (this.state.listaDeDisponiveis).slice();

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

  //excluir bolsa da coleção de bolsas e atualizar repositório local
  handleClickExcluirBolsa(event) {
    let bolsas = (this.state.listaDeFavoritas).slice();
    
    let botao = event.target.name;
    let indice = botao.substring(7, botao.length);
    bolsas.splice(indice, 1);
    
    this.setState({'listaDeFavoritas': bolsas});
  }
  
  carregarListaDeDisponiveis() {
    let bolsas = this.mock1();
    let i;

    // acrescenta as propriedades selected e índice a todos os itens
    for (i in bolsas) {
      bolsas[i].selected = false;
      bolsas[i].id = i;
    }
    
    return bolsas;
  }

  mock1() {
    var dados = require('./db.json');
    return (dados);
  }

  handleClickCheckBolsa(event) {
    let indiceSelecionado = event.target.id;
    let bolsas = (this.state.listaDeDisponiveis).slice();
    let i;

    for (i in bolsas) {
      if (i === indiceSelecionado) {
        bolsas[i].selected = !bolsas[i].selected;
        break;
      }
    }
    this.setState({listaDeDisponiveis: bolsas});
  }

  handleClickAdicionarBolsas(event) {
    // fecha modal
    document.getElementById('modal').setAttribute("style", "display: none;");
    
    let disponiveis = this.state.listaDeDisponiveis;
    let selecionadas = [];
    
    // monta array com bolsas selecionadas
    for (let i in disponiveis) {
      if (disponiveis[i].selected) {
        selecionadas.push(disponiveis[i])
      }
    }
    
    let favoritas = (this.state.listaDeFavoritas).slice();
    for (let i in favoritas) {
      for (let j in selecionadas) {
        if ((favoritas[i].university.name === selecionadas[j].university.name) &&
             (favoritas[i].course.name === selecionadas[j].course.name) &&
             (favoritas[i].course.kind === selecionadas[j].course.kind) &&
             (favoritas[i].course.shift === selecionadas[j].course.shift) &&
             (favoritas[i].start_date === selecionadas[j].start_date) &&
             (favoritas[i].price_with_discount === selecionadas[j].price_with_discount)) {
               console.log(selecionadas);
               selecionadas.splice(j);
               console.log("eliminar repetida");
               console.log(selecionadas);
        }
      }
    }
    
    this.setState({listaDeFavoritas: favoritas.concat(selecionadas)});
  }

  handleClickSemestre(event) {
    this.setState({'semestre': event.target.name});
  }

  handleClickAbrirModal(event) {
    let bolsas = (this.state.listaDeDisponiveis).slice();
    let i;
    
    for (i in bolsas) {
      bolsas[i].selected = false;
    }
    this.setState({listaDeDisponiveis: bolsas});
    document.getElementById('modal').setAttribute("style", "display: block;");
    document.getElementById('header').scrollIntoView();
  }

  handleClickFecharModal(event) {
    document.getElementById('modal').setAttribute("style", "display: none;");
  }

  render() {
    return (
      <React.Fragment>
        
        <Header />
        
        <main className="cont">
        
          <p className="cont__text cont__text_title">Bolsas favoritas</p>
          <p className="cont__text cont__text_regular">Adicione bolsas de cursos e faculdades do seu interesse e receba atualizações com as melhores ofertas disponíveis</p>

          <Semestre onClick={this.handleClickSemestre} 
            selected={this.state.semestre} />

          <ListaDeFavoritas className="lista-fav" 
            semestre={this.state.semestre} 
            onClickAbrir={this.handleClickAbrirModal}
            onClickExcluir={this.handleClickExcluirBolsa}
            bolsas={this.state.listaDeFavoritas}/>
            
        </main>

        <Modal semestre={this.state.semestre} 
               bolsas={this.state.listaDeDisponiveis}
               onClickCancelar={this.handleClickFecharModal}
               onClickChecar={this.handleClickCheckBolsa}
               onClickAdicionar={this.handleClickAdicionarBolsas}/> 
                
      </React.Fragment>
    );
  }  
}

export default App;
