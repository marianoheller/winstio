import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import * as socketActions from '../../actions/socket';

class Game extends Component {
  constructor() {
    super();
    this.handleLeaveRoom = this.handleLeaveRoom.bind(this);
  }

  handleLeaveRoom() {
    const { leaveRoom, roomId } = this.props;
    leaveRoom(roomId);
  }

  render() {
    const { roomId } = this.props;
    if (!roomId) return <Redirect to="/" />;

    return (
      <div>
        GAME
        <p>Room id: {roomId}</p>
        <button onClick={this.handleLeaveRoom}>Leave game</button>
      </div>
    );
  }
}


Game.propTypes = {
  roomId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  leaveRoom: PropTypes.func.isRequired,
};

const mapStateToProps = ({ room }) => ({
  roomId: room.roomId,
});

const mapDispatchToProps = dispatch => ({
  leaveRoom: roomId => dispatch(socketActions.leaveRoom.request(roomId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
