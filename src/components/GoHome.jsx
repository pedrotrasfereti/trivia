// React
import React, { Component } from 'react';

// Router
import { withRouter } from 'react-router';

// PropTypes
import PropTypes from 'prop-types';

class GoHome extends Component {
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
        data-testid="btn-go-home"
        onClick={ () => this.redirectToHome() }
      >
        Voltar para a tela inicial
      </button>
    );
  }
}

GoHome.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(GoHome);
