import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <React.Fragment>
        <header className="head__container">
            <section className="head__section head__section1">
                    <i className="fas fa-info-circle head__icon"></i>
                    <p className="head__text head__text_regular">Como funciona</p>
            </section>

            <section className="head__section head__section2">
                <i className="fab fa-whatsapp head__icon"></i>
                <div className="head__text-container">
                    <p className="head__text head__text_regular">0800 123 2222</p>
                    <p className="head__text head__text_small">Envie mensagem ou ligue</p></div>
            </section>

            <section className="head__section head__section3">
                <img className="head__logo" src="./img/logo.svg" alt="Quero Bolsa" />
            </section>

            <section className="head__section head__section4">
                <p className="head__text head__text_regular">Nome Sobrenome</p>
                <i className="far fa-user-circle head__icon"></i>
            </section>
        </header>

        <nav className="menu">
            <a className="menu__item menu__item_regular" href="#top">Minha conta</a>
            <a className="menu__item menu__item_small" href="#top">Pré-matrículas</a>
            <a className="menu__item menu__item_small menu__item_selected" href="#top">Bolsas favoritas</a>
        </nav>

        <nav className="bred">
            <a className="bred__text_parent bred__text" href="#top">Home</a>
            <a className="bred__separator bred__text" href="#top">/</a> 
            <a className="bred__text_parent bred__text" href="#top">Minha conta</a>
            <a className="bred__separator bred__text" href="#top">/</a> 
            <a className="bred__text_current bred__text" href="#top">Bolsas favoritas</a>
        </nav>
      </React.Fragment>
    );
  }  
}

export default Header;
    
