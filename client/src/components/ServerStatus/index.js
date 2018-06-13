import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Portal } from 'react-portal';

const StatusContainer = styled.div``;
const Message = styled.div``;


export default function ServerStatus(props) {
  return (
    <Portal>
      <StatusContainer>
        <Message>Server status: {props.status ? 'On' : 'Off'}</Message>
      </StatusContainer>
    </Portal>
  );
}

ServerStatus.propTypes = {
  status: PropTypes.bool,
};

ServerStatus.defaultProps = {
  status: false,
};
