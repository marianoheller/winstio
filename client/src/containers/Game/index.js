import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import * as socketActions from '../../actions/socket';

class Game extends Component {
  constructor(props) {
    super(props);
    this.handleLeaveRoom = this.handleLeaveRoom.bind(this);
  }

  handleLeaveRoom() {
    const { leaveRoom, roomId, username } = this.props;
    leaveRoom(username, roomId);
  }

  render() {
    const { roomId, username } = this.props;
    if (!roomId) return <Redirect to="/" />;
    return (
      <div>
        GAME
        <p>Username: {username}</p>
        <p>Room id: {roomId}</p>
        <button onClick={this.handleLeaveRoom}>Leave game</button>
      </div>
    );
  }
}

Game.propTypes = {
  username: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  roomId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  leaveRoom: PropTypes.func.isRequired,
};

Game.defaultProps = {
  username: null,
  roomId: 'asasd',
};

const mapStateToProps = ({ room }) => ({
  roomId: room.roomId,
  username: room.username,
});

const mapDispatchToProps = dispatch => ({
  leaveRoom: roomId => dispatch(socketActions.leaveRoom.request(roomId)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Game);
