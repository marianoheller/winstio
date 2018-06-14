import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import JoinGameForm from '../../components/JoinGameForm';

import * as socketActions from '../../actions/socket';

class Landing extends Component {
  constructor(props) {
    super(props);
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
    const { roomId } = this.props;
    if (roomId) return <Redirect to="/game" />;
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
  roomId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  joinRoom: PropTypes.func.isRequired,
};

Landing.defaultProps = {
  roomId: null,
};

const mapStateToProps = ({ socket, room }) => ({
  serverStatus: Boolean(socket.connection.socket),
  roomId: room.roomId,
});

const mapDispatchToProps = dispatch => ({
  joinRoom: username => dispatch(socketActions.joinRoom.request(username)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Landing);
