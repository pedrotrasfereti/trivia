// React
import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import validateLogin from '../redux/actions/validateLogin';

// Services
import apiTrivia from '../helpers/apiTrivia';
import { putTokenInLocalStorage } from '../helpers/servicesAPI';
import { setGameInfo } from '../redux/actions/game';

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

  async setQuestions() {
    const { dispatchGameInfo } = this.props;
    const token = localStorage.getItem('token') || '';

    await apiTrivia(token)
      .then((results) => dispatchGameInfo(results));

    // Redirecionar para a tela de jogo
    const { history } = this.props;
    history.push('/game');
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async submitLogin() {
    // Guardar login na store
    const { dispatchValidateLogin } = this.props;
    const { nome, email } = this.state;
    await dispatchValidateLogin({ nome, email });

    // Guardar token no local storage
    putTokenInLocalStorage();

    // Guardar as informações de jogo na store
    await this.setQuestions();
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
  dispatchGameInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchValidateLogin: (value) => dispatch(validateLogin(value)),
  dispatchGameInfo: (value) => dispatch(setGameInfo(value)),
});

export default connect(null, mapDispatchToProps)(Login);
