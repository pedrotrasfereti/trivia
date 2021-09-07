// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Children
import HeaderGame from '../components/HeaderGame';
import PlayAgain from '../components/PlayAgain';
import ViewRanking from '../components/ViewRanking';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.renderMessage = this.renderMessage.bind(this);
    this.renderFeedbackQuestion = this.renderFeedbackQuestion.bind(this);
  }

  renderMessage() {
    const { assertions } = this.props;
    const three = 3;
    if (assertions < three) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  renderFeedbackQuestion() {
    const { assertions } = this.props;
    if (assertions === 0) {
      return (
        <span data-testid="feedback-total-question">Não acertou nenhuma pergunta</span>);
    }
    return (
      <span data-testid="feedback-total-question">
        Acertou
        {assertions}
        perguntas
      </span>);
  }

  render() {
    const { score } = this.props;
    return (
      <section>
        <HeaderGame />
        <span data-testid="feedback-text">
          { this.renderMessage() }
        </span>
        <span data-testid="feedback-total-score">
          { score }
        </span>
        <span data-testid="feedback-total-question-span">
          { this.renderFeedbackQuestion() }
        </span>
        <PlayAgain />
        <ViewRanking />
      </section>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  assertions: store.game.assertions, // Número de acertos
  score: store.header.score,
});

export default connect(mapStateToProps, null)(Feedback);
