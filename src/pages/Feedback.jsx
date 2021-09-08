// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// GravatarAPI
import getGravatar from '../helpers/gravatarAPI';

// Children
import HeaderGame from '../components/HeaderGame';
import PlayAgain from '../components/PlayAgain';
import ViewRanking from '../components/ViewRanking';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.renderMessage = this.renderMessage.bind(this);
  }

  componentDidMount() {
    const stateStorage = localStorage.getItem('state');
    const stateJson = JSON.parse(stateStorage);
    const { player: { gravatarEmail, name, score } } = stateJson;
    const rankingStorage = localStorage.getItem('ranking');
    const rankingJson = JSON.parse(rankingStorage);
    const objRanking = {
      name,
      score,
      picture: getGravatar(gravatarEmail),
    };
    const arrayRanking = [];
    if (rankingJson) {
      arrayRanking.push(...rankingJson);
    }
    arrayRanking.push(objRanking);
    localStorage.setItem('ranking', JSON.stringify(arrayRanking));
  }

  renderMessage() {
    const { assertions } = this.props;
    const three = 3;
    if (assertions < three) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    return (
      <section>
        <HeaderGame />
        <span data-testid="feedback-text">
          { this.renderMessage() }
        </span>
        <PlayAgain />
        <ViewRanking />
      </section>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  assertions: store.game.assertions, // Número de acertos
});

export default connect(mapStateToProps, null)(Feedback);
