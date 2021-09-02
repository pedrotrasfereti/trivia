import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import validateLogin from '../redux/actions/validateLogin';
import { putTokenInLocalStorage } from '../helpers/servicesAPI';

const regexEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.openSettings = this.openSettings.bind(this);

    this.state = {
      nome: '',
      email: '',
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  submitLogin() {
    const { dispatchValidateLogin } = this.props;
    const { nome, email } = this.state;
    putTokenInLocalStorage();
    dispatchValidateLogin({ nome, email });
    const { history } = this.props;
    history.push('/settings');
  }

  openSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { nome, email } = this.state;
    const statusButton = !(regexEmail.test(email) && nome.length > 0);
    return (
      <div>
        <label htmlFor="name-input">
          Nome:
          <input
            type="text"
            id="name-input"
            data-testid="input-player-name"
            name="nome"
            value={ nome }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email-input">
          Email:
          <input
            type="text"
            id="email-input"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ statusButton }
          type="button"
          data-testid="btn-play"
          onClick={ this.submitLogin }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.openSettings }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchValidateLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchValidateLogin: (value) => dispatch(validateLogin(value)),
});

export default connect(null, mapDispatchToProps)(Login);
