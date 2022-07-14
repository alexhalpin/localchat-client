import socket from './socketConfig';
import { useState } from 'react';
import { useRef } from 'react';
import './App.css';
import TextInput from './components/textinput';
import MessageBox from './components/messagebox';
import { useEffect } from 'react';

function App(props) {
  socket.addEventListener('open', (e) => {
    console.log('Websocket Connection Successful');
  });

  // Receive and Display Messages
  var [messageArr, setMessageArr] = useState([]);
  socket.addEventListener('message', (e) => {
    var msg = JSON.parse(e.data);
    // console.log(`Received: ${msg}`);
    setMessageArr([...messageArr, msg]);
  });

  //Automatically Scroll to Bottom of Messages on Update
  var anchorRef = useRef(null);
  useEffect(() => {
    anchorRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  // Set Username
  var [username, setUsername] = useState('Anonymous');

  // Send Message
  const sendMessage = (inputText) => {
    var msg = {
      username: username,
      message: inputText,
    };
    console.log('Sent:', msg);

    socket.send(JSON.stringify(msg));
  };

  return (
    <div className="App">
      <div className="UsernameInput">
        <TextInput fieldName={'Username Input'} onSubmit={setUsername} />
      </div>
      <div className="MessageBox">
        <MessageBox messages={messageArr} />
        <div className="Anchor" ref={anchorRef} />
      </div>
      <div className="MessageInput">
        <TextInput fieldName={'Message Input'} onSubmit={sendMessage} />
      </div>
    </div>
  );
}

export default App;
