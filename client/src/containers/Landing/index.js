import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import JoinGameForm from '../../components/JoinGameForm';

import * as socketActions from '../../actions/socket';

class Landing extends Component {
  constructor() {
    super();
    this.checkStatus = this.checkStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  checkStatus() {
    const { serverStatus } = this.props;
    return serverStatus;
  }

  handleSubmit(values) {
    const { joinRoom } = this.props;
    joinRoom(values.username);
  }

  render() {
    return (
      <div>
        LANDING!
        <JoinGameForm
          checkStatus={this.checkStatus}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

Landing.propTypes = {
  serverStatus: PropTypes.bool.isRequired,
  joinRoom: PropTypes.func.isRequired,
};

const mapStateToProps = ({ socket }) => ({
  serverStatus: Boolean(socket.connection.socket),
});

const mapDispatchToProps = dispatch => ({
  joinRoom: username => dispatch(socketActions.joinRoom.request(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
