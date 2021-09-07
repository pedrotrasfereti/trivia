// React
import React, { Component } from 'react';
import HeaderGame from '../components/HeaderGame';

class Feedback extends Component {
  render() {
    return (
      <section>
        <HeaderGame />
        <span data-testid="feedback-text">
          Texto de feedback
        </span>
      </section>
    );
  }
}

export default Feedback;
