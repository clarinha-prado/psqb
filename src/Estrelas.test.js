import React from 'react';
import Estrelas from './Estrelas.js';

const ESTRELA_CHEIA = '[className="fas fa-star bfav__estrela"]';
const ESTRELA_VAZIA = '[className="far fa-star bfav__estrela"]';
const ESTRELA_MEIO  = '[className="fas fa-star-half-alt bfav__estrela"]';

const invalidValues = [['-1', 5, 0, 0], 
                       ['6',  0, 0, 5], 
                       ['5.5',0, 0, 5]];

const validValues = [[ '0' , 5, 0, 0], 
                     [ '2' , 3, 0, 2],
                     [ '5' , 0, 0, 5],
                     ['1.7', 3, 1, 1], 
                     ['3.2', 1, 1, 3], 
                     ['4.9', 0, 1, 4]]; 

function executeTest(testCase) {
  describe('Se a avaliação for ' + testCase[0], 
    function () 
    {
      it(testCase[3] + ' estrelas cheias', () => 
        {
          const wrapper = shallow(<Estrelas score={testCase[0]} />);
          //console.log(wrapper.debug());
          expect(wrapper.find(ESTRELA_CHEIA)).to.have.lengthOf(testCase[3]);
        }
      );

      it(testCase[2] + ' estrelas meio', () => 
        {
          const wrapper = shallow(<Estrelas score={testCase[0]} />);
          expect(wrapper.find(ESTRELA_MEIO)).to.have.lengthOf(testCase[2]);
        }
      );

      it(testCase[1] + ' estrelas vazias', () => 
        {
          const wrapper = shallow(<Estrelas score={testCase[0]} />);
          expect(wrapper.find(ESTRELA_VAZIA)).to.have.lengthOf(testCase[1]);
        }
      );
    }
   );
};
    
console.log("VALORES INVÁLIDOS");
invalidValues.map(executeTest);

console.log("VALORES VÁLIDOS");
validValues.map(executeTest);

  
