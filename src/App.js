/******************************************************************************* 
 *  Componente App
 * 
 *  Renderiza todos os outros componentes
 *  Trata todos os eventos da interface com usuário
 *  Armazena a lista de bolsas favoritas e disponíveis em seu estado
 */

import React from 'react';
import Semestre from './Semestre';
import ListaDeFavoritas from './ListaDeFavoritas';
import Modal from './Modal';
import Header from './Header';

class App extends React.Component {
  
/*******************************************************************************
 * Carrega a lista de bolsas favoritas do repositório local.
 * Carrega a lista de bolsas disponíveis da URL fornecida via GET.
 * Armazena as listas no estado do componente.
 * Realiza o bind dos métodos que vão tratar os eventos da interface.
 * 
 * @param -
 * @returns {App}
 */  
  constructor(props) {
    super(props);
    
    // lê bolsas favoritas do repositório local
    var listaDeFavoritas = JSON.parse(localStorage.getItem('ListaDeFavoritas'));

    // armazena estado com bolsas favoritas, disponíveis, semestre selecionado 
    // coluna para ordenação da lista de bolsas disponíveis
    this.state = {semestre: "todos",
      listaDeDisponiveis: [],
      listaDeFavoritas: listaDeFavoritas,
      ordenacaoDisponiveis: 'Nome da Faculdade'};

    // eventos da lista de bolsas favoritas
    this.handleClickSemestre = this.handleClickSemestre.bind(this);
    this.handleClickExcluirBolsa = this.handleClickExcluirBolsa.bind(this);
    this.handleClickAbrirModal = this.handleClickAbrirModal.bind(this);

    // eventos da lista de bolsas disponíveis - na janela modal
    this.handleHeaderChange = this.handleHeaderChange.bind(this);
    this.handleClickCheckBolsa = this.handleClickCheckBolsa.bind(this);
    this.handleClickFecharModal = this.handleClickFecharModal.bind(this);
    this.handleClickAdicionarBolsas = this.handleClickAdicionarBolsas.bind(this);
 }



/*******************************************************************************
 * Carrega lista de bolsas disponíveis via http-get no estado do componente
 * 
 * @returns -
 */
  componentDidMount() {
  var thisReference = this;
  var url = 'https://testapi.io/api/redealumni/scholarships'

  fetch(url)
   .then(function(response){
     console.log("status: " + response.status);
    if (response.status >= 400) {
      throw new Error("Não foi possível ler lista de bolsas.");
    }
    return response.json();
  })
   .then(function(data) {
    thisReference.setState({listaDeDisponiveis: data.slice()});
  });

  }     



/*******************************************************************************
 * Atualiza no estado o semestre selecionado. 
 * Valores válidos: "todos", 2019.2, 2020.1, 2020.2, ...
 * 
 * @param {type} event - grupo de botões de seleção de semestre
 * @returns -
 */
  handleClickSemestre(event) {
    this.setState({'semestre': event.target.name});
  }



/*******************************************************************************
 * Exclui uma bolsa da lista de bolsas favoritas e atualiza repositório local
 * e o estado do componente
 * 
 * @param {type} event - botão 'excluir' com o id da bolsa a ser excluída
 * @returns -
 */
  handleClickExcluirBolsa(event) {
    let bolsas = (this.state.listaDeFavoritas).slice();
    
    // obtém o índice da bolsa e a exclui
    let botao = event.target.name;
    let indice = botao.substring(7, botao.length);
    bolsas.splice(indice, 1);
    
    // armazena nova lista no repositório local e no estado do componente
    var localStorage = window.localStorage;
    localStorage.setItem('ListaDeFavoritas',  JSON.stringify(bolsas));
    this.setState({listaDeFavoritas: bolsas});
  }

  
  
/*******************************************************************************
 * Mostra janela modal com a lista de bolsas disponíveis.
 * 
 * @param {type} event - botão '+' adicionar bolsa
 * @returns -
 */
  handleClickAbrirModal(event) {
    let bolsas = (this.state.listaDeDisponiveis).slice();

    // se o campo selected ainda não foi configurado, é porque o arquivo acabou
    // de ser carregado e precisa ser ordenado
    console.log("selected = " + this.state.listaDeDisponiveis[0].selected);
    if (this.state.listaDeDisponiveis[0].selected === undefined) {
      
      // ordena lista de bolsas por 'Nome da Faculdade'
      bolsas.sort(function(a, b){
        var x = a.university.name.toLowerCase();
        var y = b.university.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });    
    }
    
    // atribui valor selected:false e id às bolsas
    for (let i in bolsas) {
      bolsas[i].selected = false;
      bolsas[i].id = i;
    }
    this.setState({listaDeDisponiveis: bolsas});
    
    // mostra janela modal
    document.getElementById('modal').setAttribute("style", "display: block;");
    document.getElementById('header').scrollIntoView();
  }



/*******************************************************************************
 * Ordenar a lista de bolsas por: Nome da Faculdade (asc)
 *                                Nome do Curso     (asc)
 *                                Mensalidade       (asc)
 *                                
 * @param {type} event - campo select 'Ordenar por' no cabeçalho da lista de 
 *                       bolsas disponíveis
 * @returns -
 */ 
  handleHeaderChange(event) {
    let bolsas = (this.state.listaDeDisponiveis).slice();
    
    // ordena lista de acordo com o parâmetro selecionado
    switch (event.target.value) {
      case 'Nome da Faculdade':
        bolsas.sort(function(a, b){
          var x = a.university.name.toLowerCase();
          var y = b.university.name.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });    
        break;
      case 'Curso':
        bolsas.sort(function(a, b){
          var x = a.course.name.toLowerCase();
          var y = b.course.name.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });    
        break;
      case 'Valor':
        bolsas.sort(function(a, b){return a.price_with_discount - b.price_with_discount});    
        break;
      default:
        break;
    }
    
    // armazena lista ordenada no estado do componente
    this.setState({listaDeDisponiveis: bolsas});
  }



/*******************************************************************************
 * Seleciona ou deseleciona uma das bolsas disponíveis.
 * 
 * @param {type} event - checkbox da bolsa disponível
 * @returns -
 */
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



/*******************************************************************************
 * Esconde janela modal.
 * 
 * @param {type} event - botão 'x' ou 'Cancelar' da janela modal
 * @returns -
 */
  handleClickFecharModal(event) {
    document.getElementById('modal').setAttribute("style", "display: none;");
  }



/*******************************************************************************
 * Adiciona bolsas selecionadas à lista de bolsas favoritas do usuário.
 * Não adiciona bolsas que já estejam na lista de favoritas.
 * Armazena lista atualizada no repositório local e no estado do componente.
 * 
 * @param {type} event - botão 'Adicionar bolsas' na janela modal
 * @returns -
 */
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
    
    // não inclui bolsa escolhida se ela já estiver na lista de favoritas
    let favoritas = (this.state.listaDeFavoritas).slice();
    for (let i in favoritas) {
      for (let j in selecionadas) {
        if ((favoritas[i].university.name === selecionadas[j].university.name) &&
          (favoritas[i].course.name === selecionadas[j].course.name) &&
          (favoritas[i].course.kind === selecionadas[j].course.kind) &&
          (favoritas[i].course.shift === selecionadas[j].course.shift) &&
          (favoritas[i].start_date === selecionadas[j].start_date) &&
          (favoritas[i].price_with_discount === selecionadas[j].price_with_discount)) {
            selecionadas.splice(j);
        }
      }
    }
    
    // armazena nova lista no repositório local e no estado do componente
    var localStorage = window.localStorage;
    localStorage.setItem('ListaDeFavoritas',  JSON.stringify(favoritas.concat(selecionadas)));
    this.setState({listaDeFavoritas: favoritas.concat(selecionadas)});
  }



/*******************************************************************************
 * Renderiza componentes
 * 
 * @returns App, Header, Semestre, ListaDeFavoritas, Modal
 */
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
          onClickAdicionar={this.handleClickAdicionarBolsas}
          onHeaderChange={this.handleHeaderChange}/> 
                
      </React.Fragment>
    );
  }  
}

export default App;
