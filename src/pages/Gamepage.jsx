// React
import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { setAnswers, setAssertions,
  toggleTimer, setScore } from '../redux/actions/game';
import { pressQuestionBtn } from '../redux/actions/pressBtn';

// Children
import HeaderGame from '../components/HeaderGame';
import NextBtn from '../components/NextBtn';
import GameTimer from '../components/GameTimer';
import GameAnswers from '../components/GameAnswers';

// Helpers
import shuffleAnswers from '../helpers/shuffleAnswers';

// Styles
import '../styles/Gamepage.css';

class Gamepage extends React.Component {
  constructor(props) {
    super(props);

    this.setAnswers = this.setAnswers.bind(this);
    this.enableNextBtn = this.enableNextBtn.bind(this);
    this.setAssertions = this.setAssertions.bind(this);
    this.addStyles = this.addStyles.bind(this);
    this.answered = this.answered.bind(this);
    this.sendScoreToLocalStorage = this.sendScoreToLocalStorage.bind(this);
  }

  componentDidMount() {
    const { toggleTimerDispatch } = this.props;
    this.setAnswers();
    toggleTimerDispatch();
  }

  /* As funções a seguir estão relacionadas com os eventos das respostas */
  setAnswers() {
    const {
      game,
      questionNumber,
      setAnswersDispatch,
    } = this.props;

    shuffleAnswers(
      game,
      questionNumber,
      setAnswersDispatch,
      this.answered,
    ); // Salva as respostas na chave answers do estado global
  }

  setAssertions(target) {
    const { setAssertionsDispatch } = this.props;
    // Acertos
    let assertions = 0;

    if (target.id === 'correct-answer') {
      assertions += 1;
      console.log('Alternativa correta!');
    } else {
      console.log('Alternativa incorreta.');
    }

    setAssertionsDispatch(assertions);
  }

  enableNextBtn() {
    const { enableNextBtnDispatch } = this.props;
    enableNextBtnDispatch();
  }

  addStyles() {
    // Adiciona estilo para a alternativa correta
    const correta = document.querySelector('#correct-answer');
    correta.classList.add('correct-highlight');

    // Disabilita botões de resposta
    correta.disabled = true;

    // Adiciona estilo para as alternativas incorretas
    const incorretas = document.querySelectorAll('.incorrect-answer');
    incorretas.forEach((el) => {
      el.classList.add('incorrect-highlight');

      // Disabilita botões de resposta
      el.disabled = true;
    });
  }

  sendScoreToLocalStorage(target) {
    if (target.id === 'correct-answer') {
      // Obtendo dados
      const { timer, scoreDispatch } = this.props;
      // = this.state utilizar o timer do state;
      const { game, questionNumber } = this.props;
      const { difficulty } = game[questionNumber];
      // Utilizando variaveis de controle
      const obj = { hard: 3, medium: 2, easy: 1 };
      let valor;
      switch (difficulty) {
      case 'hard':
        valor = obj.hard;
        break;
      case 'medium':
        valor = obj.medium;
        break;
      case 'easy':
        valor = obj.easy;
        break;
      default:
      }
      // Obtendo dados do localStorage
      const state = JSON.parse(localStorage.getItem('state'));
      const defaultReward = 10;
      state.player.score += defaultReward + valor * timer;
      // devolvendo os dados para o localStorage
      localStorage.setItem('state', JSON.stringify(state));
      scoreDispatch(state.player.score);
    }
  }

  answered({ target }) {
    const { toggleTimerDispatch } = this.props;
    // Desligar timer
    toggleTimerDispatch();

    // Estilos
    this.addStyles();

    // Atualizar pontuação
    this.sendScoreToLocalStorage(target);
    this.setAssertions(target);

    // Habilitar nova pergunta
    this.enableNextBtn();
  }

  render() {
    const { game, questionNumber } = this.props;
    const { category, question } = game[questionNumber];

    return (
      <section className="Gamepage">
        <HeaderGame />
        <GameTimer
          addStyles={ this.addStyles }
          enableNextBtn={ this.enableNextBtn }
        />
        <div>
          <h3 data-testid="question-category">
            { category }
          </h3>
          <p data-testid="question-text">
            { question }
          </p>
          <GameAnswers />
        </div>
        <NextBtn setAnswers={ this.setAnswers } />
      </section>
    );
  }
}

Gamepage.propTypes = {
  game: PropTypes.arrayOf(PropTypes.object).isRequired, // Array de perguntas
  questionNumber: PropTypes.number.isRequired, // Número da pergunta
  timer: PropTypes.number.isRequired, // Número do tempo
  setAnswersDispatch: PropTypes.func.isRequired, // Salvar respostas
  setAssertionsDispatch: PropTypes.func.isRequired, // Salvar pontuação
  enableNextBtnDispatch: PropTypes.func.isRequired, // Habilitar nova pergunta
  toggleTimerDispatch: PropTypes.func.isRequired, // Ligar/Desligar timer
  scoreDispatch: PropTypes.func.isRequired, // Ligar/Desligar timer
};

const mapStateToProps = (state) => ({
  game: state.game.game,
  questionNumber: state.game.questionNumber,
  timer: state.game.timer,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswersDispatch: (payload) => dispatch(setAnswers(payload)),
  setAssertionsDispatch: (payload) => dispatch(setAssertions(payload)),
  enableNextBtnDispatch: (payload) => dispatch(pressQuestionBtn(payload)),
  toggleTimerDispatch: () => dispatch(toggleTimer()),
  scoreDispatch: (payload) => dispatch(setScore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gamepage);
