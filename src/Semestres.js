/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import './Semestres.css';

class Semestres extends React.Component {
  constructor(props) {
    super(props);
    this.state = { buttons: [1,0,0] };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event) {
    switch(event.target.name) {
      case 'todos':
        this.setState({buttons: [1,0,0]});
        break;
      case 'sem1':
        this.setState({buttons: [0,1,0]});
        break;
      case 'sem2':
        this.setState({buttons: [0,0,1]});
    }
  }
  
  render() {
    return (
      <section className="sems">
        <div className="sems__border">
          <button name='todos' 
                  onClick={this.handleClick}
                  className={`sems__button sems__button_first
                    ${this.state.buttons[0] ? " sems__button_selected" : " sems__button_unselected"}`}>
                  Todos os semestres
          </button>
          
          <button name='sem1' 
                  onClick={this.handleClick}
                  className={`sems__button 
                    ${this.state.buttons[1] ? " sems__button_selected" : " sems__button_unselected"}`}>
                  2º semestre de 2019
          </button>
          
          <button name='sem2' 
                  onClick={this.handleClick}
                  className={`sems__button sems__button_last
                    ${this.state.buttons[2] ? " sems__button_selected" : " sems__button_unselected"}`}>
                  1º semestre de 2020
          </button>
        </div>
      </section>
           );
  }
};

export default Semestres;