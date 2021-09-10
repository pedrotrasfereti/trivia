// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

class SubmitLogin extends Component {
  render() {
    const { statusButton, submitLogin } = this.props;
    return (
      <button
        disabled={ statusButton }
        type="button"
        className="btn btn-primary"
        data-testid="btn-play"
        onClick={ submitLogin }
      >
        Jogar
      </button>
    );
  }
}

SubmitLogin.propTypes = {
  statusButton: PropTypes.bool.isRequired,
  submitLogin: PropTypes.func.isRequired,
};

export default SubmitLogin;
