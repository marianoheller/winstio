import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Game from './containers/Game';
import Landing from './containers/Landing';

export default function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/game" component={Game} />
        <Route path="/" exact component={Landing} />
        <Route
          path="/*"
          render={() => <Redirect to="/" />}
        />
      </Switch>
    </React.Fragment>
  );
}
