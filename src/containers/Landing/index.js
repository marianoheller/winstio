import React, { Component } from 'react';

import JoinGameForm from '../../components/JoinGameForm';

export default class Landing extends Component {
  render() {
    return (
      <div>
        LANDING!
        <JoinGameForm checkFetching={() => false} />
      </div>
    )
  }
}
