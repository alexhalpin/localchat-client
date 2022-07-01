import './App.css';
import TextInput from './textinput';

import socket from './socketConfig';

const sendMessage = (inputText) => {
  socket.send(inputText);
};

const sendLogin = (inputText) => {
  socket.send(`Username: ${inputText}`);
};

function App(props) {
  // var socket = props.socketObj;

  return (
    <div className="App">
      <div className="UsernameInput">
        <TextInput fieldName={'Username Input'} onSubmit={sendLogin} />
      </div>
      <div className="MessageBox">bruuuh</div>
      <div className="MessageInput">
        <TextInput fieldName={'Message Input'} onSubmit={sendMessage} />
      </div>
    </div>
  );
}

export default App;
