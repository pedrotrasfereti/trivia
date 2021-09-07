// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Helpers
import gravatar from '../helpers/gravatarAPI';

class HeaderGame extends Component {
  render() {
    const { props: { score, playerEmail, playerName } } = this;
    const gravatarSrc = gravatar(playerEmail);
    return (
      <header>
        {/* Gravatar */}
        <img
          src={ gravatarSrc }
          id="header-profile-picture"
          data-testid="header-profile-picture"
          alt="gravatar"
        />
        {/* Nome do jogador */}
        <span
          id="header-profile-picture"
          data-testid="header-player-name"
        >
          { playerName }
        </span>
        {/* Pontuação */}
        <span
          id="header-score"
          data-testid="header-score"
        >
          { score }
        </span>
      </header>
    );
  }
}

HeaderGame.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  playerName: store.login.nome,
  playerEmail: store.login.email,
  score: store.header.score,
});

export default connect(mapStateToProps, null)(HeaderGame);
