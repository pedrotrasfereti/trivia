// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Children
import HeaderGame from '../components/HeaderGame';
import PlayAgain from '../components/PlayAgain';
import ViewRanking from '../components/ViewRanking';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.renderMessage = this.renderMessage.bind(this);
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
