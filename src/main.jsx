import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import socket from './socketConfig';

socket.addEventListener('open', (e) => {
  console.log('Websocket Connection Successful');
});

socket.addEventListener('message', (e) => {
  console.log(`Received: ${e.data}`);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App socketObj={socket} />
  </React.StrictMode>
);
