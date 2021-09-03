import React from 'react';
import apiTrivia from '../helpers/apiTrivia';

const inicialiGame = () => {
  const token = localStorage.getItem('token');
  return apiTrivia(token);
};

class Gamepage extends React.Component {
  answerRandom() {
    const answers = [
      inicialiGame[0].correct_answer,
      ...inicialiGame[0].incorrect_answers,
    ];
    const answersRandom = answers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    console.log(answersRandom);
  }

  render() {
    const { category } = inicialiGame[0];
    const { question } = inicialiGame[0];
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
