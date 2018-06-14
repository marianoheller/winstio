import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Game from './containers/Game';
import Landing from './containers/Landing';

import * as socketActions from './actions/socket';

class App extends React.Component {
  componentDidMount() {
    const { initSocket } = this.props;
    initSocket();
  }

  render() {
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
}

App.propTypes = {
  initSocket: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  initSocket: () => dispatch(socketActions.init.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
