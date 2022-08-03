import React from 'react';
import './mapchart.css';

const UsernameMarker = (props) => {
  return (
    <div className="UsernameMarker" style={{ color: props.color }}>
      {props.username}
    </div>
  );
};

export default UsernameMarker;
