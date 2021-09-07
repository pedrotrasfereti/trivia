// React
import React, { Component } from 'react';

// Router
import { withRouter } from 'react-router';

// PropTypes
import PropTypes from 'prop-types';

class PlayAgain extends Component {
  constructor(props) {
    super(props);

    this.redirectToHome = this.redirectToHome.bind(this);
  }

  redirectToHome() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={ () => this.redirectToHome() }
      >
        Jogar novamente
      </button>
    );
  }
}

PlayAgain.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(PlayAgain);
