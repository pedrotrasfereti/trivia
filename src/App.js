import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Gamepage from './pages/Gamepage';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/game" component={ Gamepage } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
