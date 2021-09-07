// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { toggleTimer, setTimerGlobal } from '../redux/actions/game';

class GameTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeft: 30, // segundos
    };
  }

  /* As funções a seguir estão relacionadas com os eventos do timer */
  componentDidMount() {
    const interval = 1000;
    window.setInterval(
      () => this.checkTimerStatus(),
      interval,
    );
  }

  checkTimerStatus() {
    const { timerOn } = this.props;

    if (timerOn) this.tick();
    else this.reset();
  }

  tick() {
    const { timeLeft } = this.state;
    const { timerDispatch } = this.props;

    if (timeLeft > 0) {
      this.setState((prev) => ({
        timeLeft: prev.timeLeft - 1,
      }), () => timerDispatch(timeLeft));
    } else {
      this.timesUp();
    }
  }

  reset() {
    this.setState({ timeLeft: 30 });
  }

  timesUp() {
    const {
      addStyles,
      enableNextBtn,
      toggleTimerDispatch,
    } = this.props;
    // Desligar timer
    toggleTimerDispatch();

    // Disabilitar os botões de resposta
    addStyles();

    // Habilitar nova pergunta
    enableNextBtn();
  }

  render() {
    const { timeLeft } = this.state;
    return (
      <span>{ timeLeft }</span>
    );
  }
}

GameTimer.propTypes = {
  timerOn: PropTypes.bool.isRequired,
  addStyles: PropTypes.func.isRequired,
  enableNextBtn: PropTypes.func.isRequired,
  timerDispatch: PropTypes.func.isRequired,
  toggleTimerDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  timerOn: store.game.timerOn,
});

const mapDispatchToProps = (dispatch) => ({
  toggleTimerDispatch: () => dispatch(toggleTimer()),
  timerDispatch: (payload) => dispatch(setTimerGlobal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameTimer);
