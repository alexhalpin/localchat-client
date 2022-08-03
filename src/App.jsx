import socket from './socketConfig';
import { useState, useRef, useEffect } from 'react';

import UsernameInput from './components/usernameinput';
import MessageBox from './components/messagebox';
import MessageInput from './components/messageinput';
import MapChart from './components/mapchart';
import ErrorPlate from './components/errorplate';
import ColorPicker from './components/colorpicker';
import Nametag from './components/nametag';

import './App.css';

function App(props) {
  const [username, setUsername] = useState('Anonymous');
  const [color, setColor] = useState('#000000');
  const [uuid, setUUID] = useState('');
  const [messageArr, setMessageArr] = useState([]);
  const [error, setError] = useState(false);
  const [coords, setCoords] = useState([0, 0]);
  const [locals, setLocals] = useState([]);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handlePosition = (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(lat, long);
    setCoords([lat, long]);
  };

  const updateCoords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handlePosition);
    } else {
      console.log('Error couldnt find location');
      setError('couldnt find location');
    }
  };

  useEffect(() => {
    updateCoords();

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('message', handleMessage);
    socket.addEventListener('close', handleClose);

    return () => {
      socket.removeEventListener('message', handleMessage);
      socket.removeEventListener('open', handleOpen);
      socket.addEventListener('close', handleClose);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      sendUserUpdate();
    }
  }, [username, color, coords]);

  const sendUserUpdate = () => {
    var msg = {
      kind: 'userUpdate',
      uuid: uuid,
      data: {
        username: username,
        color: color,
        lat: coords[0].toString(),
        long: coords[1].toString(),
      },
    };
    socket.send(JSON.stringify(msg));
    console.log('Sent Update: ', msg);
  };

  const handleOpen = () => {
    console.log('Websocket Connection Opened');
  };

  const handleClose = () => {
    console.log('websocket connection closed');
    setError('websocket connection closed');
  };

  const handleMessage = (e) => {
    var msg = JSON.parse(e.data);
    switch (msg.kind) {
      case 'login': // login message
        setUUID(msg.uuid);
        updateCoords();
        setIsLoggedIn(true);
        break;

      case 'chat': // chat message
        setMessageArr((prevArr) => [...prevArr, msg]);
        break;

      case 'radarData':
        setTotalActiveUsers(msg.totalActiveUsers);
        var newArr = [...msg.locals].sort((a, b) =>
          a.loginTime > b.loginTime ? 1 : -1
        );
        setLocals(() => newArr);
        // console.log(msg.locals);
        break;

      default:
        console.log('Received Message of Unknown Kind');
        setError('received message of unknown kind');
        break;
    }
  };

  //Automatically Scroll to Bottom of Messages on Update
  var anchorRef = useRef(null);
  useEffect(() => {
    anchorRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messageArr]);

  // Send Message
  const sendMessage = (inputText) => {
    var msg = {
      kind: 'chat',
      uuid: uuid,
      data: {
        message: inputText,
      },
    };
    socket.send(JSON.stringify(msg));
    // console.log('Sent:', msg);
  };

  const updateUsername = (inputText) => {
    setUsername(inputText);
    var msg = {
      kind: 'userUpdate',
      uuid: uuid,
      data: {
        username: inputText,
        color: color,
      },
    };
  };

  return (
    <div className="App">
      {error ? (
        <ErrorPlate error={error} />
      ) : (
        <>
          <div className="Right">
            <div className="LocalList">
              {
                // locals.sort((a, b) => (a.loginTime < b.loginTime ? 1 : -1));
                locals.map((local) => (
                  <>
                    <Nametag username={local.username} color={local.color} />
                    <br></br>
                  </>
                ))
              }
            </div>
            <div className="Map">
              <MapChart
                username={username}
                color={color}
                locals={locals}
                coords={coords}
              />
              <div className="ActiveUsers">
                {totalActiveUsers} total active users
              </div>
            </div>
          </div>

          {/* <div className="Center">
            
          </div> */}

          <div className="Left">
            <div className="MessageBoxContainer">
              <div className="UsernameInput">
                <UsernameInput
                  color={color}
                  fieldName={'Username Input'}
                  placeholder={username}
                  onSubmit={updateUsername}
                />
                <ColorPicker onPick={setColor} />
              </div>
              <div className="MessageBox">
                <MessageBox messages={messageArr} />
                <div className="Anchor" ref={anchorRef} />
              </div>
              <div className="MessageInput">
                <MessageInput
                  fieldName={'Message Input'}
                  placeholder={'Type your message here.'}
                  onSubmit={sendMessage}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
