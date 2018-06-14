import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    return (
      <div>
        GAME
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
