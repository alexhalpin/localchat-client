import { useState } from 'react';
import './message.css';

function Message(props) {
  var msg = props.message;
  return (
    <>
      <div className="Container">
        <div className="SubContainer">
          <div className="User" style={{ color: msg.color }}>
            {msg.username}{' '}
          </div>
          <div className="Message"> {msg.message} </div>
        </div>
      </div>
    </>
  );
}

export default Message;
