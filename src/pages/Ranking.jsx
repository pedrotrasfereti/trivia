// React
import React, { Component } from 'react';

// Children
import GoHome from '../components/GoHome';

class Ranking extends Component {
  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        {
          /* Lista de Ranking */
        }
        <GoHome />
      </section>
    );
  }
}

export default Ranking;
