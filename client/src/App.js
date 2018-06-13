import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Game from './containers/Game';
import Landing from './containers/Landing';

import ServerStatus from './components/ServerStatus';

import * as socketActions from './actions/socket';

class App extends React.Component {
  componentDidMount() {
    const { initSocket } = this.props;
    initSocket();
  }

  render() {
    const { serverStatus } = this.props;
    return (
      <React.Fragment>
        <ServerStatus status={serverStatus} />
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
  serverStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ socket }) => ({
  serverStatus: Boolean(socket.connection.socket),
});

const mapDispatchToProps = dispatch => ({
  initSocket: () => dispatch(socketActions.init.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
