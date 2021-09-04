// React
import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Children
import HeaderGame from '../components/HeaderGame';

import NextBtn from '../components/NextBtn';
import { pressQuestionBtn } from '../redux/actions/pressBtn';

class Gamepage extends React.Component {
  constructor() {
    super();

    this.answerRandom = this.answerRandom.bind(this);
    this.enableNextBtn = this.enableNextBtn.bind(this);
  }

  enableNextBtn() {
    const { enableNextBtn } = this.props;
    enableNextBtn();
  }

  answerRandom() {
    const answers = [];
    const { games, questionNumber } = this.props;
    const incorretas = games[questionNumber].incorrect_answers;
    const correta = [games[questionNumber].correct_answer];

    answers.push(...incorretas
      .map((answer, index) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ `wrong-answer-${index}` }
          onClick={ this.enableNextBtn }
        >
          {answer}

        </button>)));
    answers.push(...correta
      .map((answer) => (
        <button
          type="button"
          data-testid="correct-answer"
          key="correct-answer"
          onClick={ this.enableNextBtn }
        >
          {answer}

        </button>)));
    return answers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  render() {
    const { games, questionNumber } = this.props;
    const { category, question } = games[questionNumber];

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
        <div><NextBtn /></div>
      </div>
    );
  }
}

Gamepage.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionNumber: PropTypes.number.isRequired,
  enableNextBtn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  games: state.game.games,
  questionNumber: state.game.question,
});

const mapDispatchToProps = (dispatch) => ({
  enableNextBtn: () => dispatch(pressQuestionBtn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gamepage);
