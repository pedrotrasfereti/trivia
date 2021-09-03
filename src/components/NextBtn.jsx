import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NextBtn extends React.Component {
  triggerNextQuestion() {
    const { pushBtn } = this.props;

    pushBtn();
  }

  render() {
    const { disable } = this.props;
    return (
      <button
        type="button"
        onClick={ this.triggerNextQuestion() }
        data-testid="btn-next"
        disabled={ disable }
      >
        Próximo
      </button>
    );
  }
}

NextBtn.propTypes = {
  pushBtn: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  disable: state.game.disable,
});

const mapDispatchToProps = (dispatch) => ({
  pushBtn: () => (dispatch(nextQuestion())),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextBtn);
