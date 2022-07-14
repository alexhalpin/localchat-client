import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Message from './message';

function MessageBox(props) {
  var messageArr = props.messages;
  return (
    <>
      {messageArr.map((msg, i) => {
        return <Message key={uuid()} message={msg} />;
      })}
    </>
  );
}

export default MessageBox;
