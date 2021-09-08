// React
import React, { Component } from 'react';

// Children
import GoHome from '../components/GoHome';

class Ranking extends Component {
  constructor() {
    super();
    this.returnRanking = this.returnRanking.bind(this);
  }

  returnRanking() {
    const rankingStorage = localStorage.getItem('ranking');
    const rankingJson = JSON.parse(rankingStorage);

    rankingJson.sort((a, b) => b.score - a.score);

    return rankingJson.map((item, index) => (
      <div key={ index }>
        <img src={ item.picture } alt="Gravatar" />
        <h4 data-testid={ `player-name-${index}` }>
          {item.name}
        </h4>
        <h4 data-testid={ `player-score-${index}` }>
          {item.score}
        </h4>
      </div>
    ));
  }

  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        { this.returnRanking() }
        <GoHome />
      </section>
    );
  }
}

export default Ranking;
