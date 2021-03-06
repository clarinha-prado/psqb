/*******************************************************************************
 * Renderiza 5 estrelas que representam a avaliação da universidade
 * 
 * @returns Estrelas
 */
import React from 'react';

class Estrelas extends React.Component {
  render() {
    var estrelas = [];
    var avaliacao = this.props.score;
    
    // normaliza valores inválidos
    if (avaliacao > 5) {
      avaliacao = 5;
    }
    if (avaliacao <0) {
      avaliacao = 0;
    }
    
    for (var i=1; i<=5; i++) {
      if (avaliacao <= i-1){
        estrelas.push(<i className="far fa-star bfav__estrela"></i>);
        break;
      } else if ((avaliacao > i-1) && (avaliacao <i)) {
        estrelas.push(<i className="fas fa-star-half-alt bfav__estrela"></i>);
        break;
      } else {
        estrelas.push(<i className="fas fa-star bfav__estrela"></i>);
      }
    }
    
    for (var j=i; j<5; j++) {
      estrelas.push(<i className="far fa-star bfav__estrela"></i>);
    }
    
    return (  
      <React.Fragment>
        {estrelas} 
      </React.Fragment>
    );
  }
};

export default Estrelas;