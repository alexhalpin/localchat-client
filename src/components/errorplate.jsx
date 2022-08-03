import React from 'react';
import '../App.css';

function ErrorPlate(props) {
  return (
    <div className="ErrorPlate">
      Error
      <div className="ErrorSubtitle">{props.error}</div>
      <div className="ErrorSubtitle">refresh</div>
    </div>
  );
}

export default ErrorPlate;
