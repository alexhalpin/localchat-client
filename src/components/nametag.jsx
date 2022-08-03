import React from 'react';

const Nametag = (props) => {
  return (
    <div className="Nametag" style={{ color: props.color }}>
      {props.username}
    </div>
  );
};

export default Nametag;
