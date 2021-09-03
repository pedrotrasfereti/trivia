import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import apiTrivia from '../helpers/apiTrivia';
import HeaderGame from '../components/HeaderGame';
import Loading from '../components/Loading';

class Gamepage extends React.Component {
  constructor() {
    super();

    this.state = {
      results: {},
      loading: true,
    };
    this.answerRandom = this.answerRandom.bind(this);
    this.inicialiGame = this.inicialiGame.bind(this);
  }

  componentDidMount() {
    this.inicialiGame();
  }

  inicialiGame() {
    const token = localStorage.getItem('token');
    apiTrivia(token).then((results) => this.setState({ results, loading: false }));
  }

  answerRandom() {
    const answers = [];
    const { results } = this.state;
    const incorretas = results[0].incorrect_answers;
    const correta = [results[0].correct_answer];
    answers.push(...incorretas
      .map((answer, index) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
        >
          {answer}

        </button>)));
    answers.push(...correta
      .map((answer, index) => (
        <button
          type="button"
          data-testid="correct-answer"
          key={ index }
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
    const { loading } = this.state;
    const { questionNumber, results } = this.props;
    if (loading) return (<Loading />);
    const { category } = results[questionNumber];
    const { question } = results[questionNumber];
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

const mapStateToProps = (state) => ({
  result: state.game.result,
  questionNumber: state.game.questionNumber,
});

Gamepage.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionNumber: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Gamepage);
