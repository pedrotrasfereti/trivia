import React from 'react';
import apiTrivia from '../helpers/apiTrivia';

const inicialiGame = () => {
  const token = localStorage.getItem('token');
  return apiTrivia(token);
};

class Gamepage extends React.Component {
  constructor() {
    super();
  }

  answerRandom() {
    const answers = [
      inicialiGame[0].correct_answer,
      ...inicialiGame[0].incorrect_answers,
    ];
    let answersRandom = 
  }

  render() {
    const category = inicialiGame[0].category;
    const question = inicialiGame[0].question;
    return (
      <div>
        <div>
          <h3 data-testid="question-category">
            { category }
          </h3>
          <p data-testid="question-text">
            { question }
          </p>
        </div>
        <div />
      </div>
    );
  }
}

export default Gamepage;
