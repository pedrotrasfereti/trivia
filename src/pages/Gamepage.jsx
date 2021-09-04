// React
import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Children
import HeaderGame from '../components/HeaderGame';

class Gamepage extends React.Component {
  constructor() {
    super();

    this.answerRandom = this.answerRandom.bind(this);
  }

  answerRandom() {
    const answers = [];
    const { games, question } = this.props;
    const incorretas = games[question].incorrect_answers;
    const correta = [games[question].correct_answer];

    answers.push(...incorretas
      .map((answer, index) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ `wrong-answer-${index}` }
        >
          {answer}

        </button>)));
    answers.push(...correta
      .map((answer) => (
        <button
          type="button"
          data-testid="correct-answer"
          key="correct-answer"
        >
          {answer}

        </button>)));
    console.log(answers);
    return answers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  render() {
    const { games } = this.props;
    const { category, question } = games[0];

    return (
      <div>
        <HeaderGame />
        Sou uma Página de game
        <div>
          <h3 data-testid="question-category">
            { category }
          </h3>
          <p data-testid="question-text">
            { question }
          </p>
          {this.answerRandom()}
        </div>
      </div>
    );
  }
}

Gamepage.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  question: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  games: state.game.games,
  question: state.game.question,
});

export default connect(mapStateToProps, null)(Gamepage);
