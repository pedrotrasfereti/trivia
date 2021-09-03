import React from 'react';
import apiTrivia from '../helpers/apiTrivia';
import HeaderGame from '../components/HeaderGame';

const inicialiGame = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  return apiTrivia(token).then((data) => console.log(data.results));
};

class Gamepage extends React.Component {
  answerRandom() {
    const answers = [
      inicialiGame()[0].correct_answer,
      ...inicialiGame()[0].incorrect_answers,
    ];
    const answersRandom = answers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  render() {
    const { category } = inicialiGame()[0];
    const { question } = inicialiGame()[0];
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
        <HeaderGame />
        Sou uma Página de game
      </div>
    );
  }
}

export default Gamepage;
