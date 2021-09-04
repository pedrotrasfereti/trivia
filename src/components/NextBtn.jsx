import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { pressNextBtn } from '../redux/actions/pressBtn';

class NextBtn extends React.Component {
  constructor() {
    super();
    this.triggerNextQuestion = this.triggerNextQuestion.bind(this);
  }

  triggerNextQuestion() {
    const { pushBtn, games, numberOfQuestion } = this.props;
    const numeroDePerguntas = Object.keys(games).length;
    const feedbackString = 'Redireciona para tela de feedback';
    const ternário = numberOfQuestion !== numeroDePerguntas - 1 ? pushBtn()
      : console.log(feedbackString);
    return ternário;
  }

  render() {
    const { disable } = this.props;
    return (
      <button
        type="button"
        onClick={ this.triggerNextQuestion }
        data-testid="btn-next"
        style={
          disable ? { display: 'none' } : { display: 'flex' }
        }
      >
        Próximo
      </button>
    );
  }
}

NextBtn.propTypes = {
  pushBtn: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  numberOfQuestion: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  disable: state.game.disable,
  games: state.game.games,
  numberOfQuestion: state.game.question,
});

const mapDispatchToProps = (dispatch) => ({
  pushBtn: () => (dispatch(pressNextBtn())),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextBtn);
