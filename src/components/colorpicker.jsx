import React from 'react';
import './colorpicker.css';

const ColorPicker = (props) => {
  const colors1 = ['#f368e0', '#ff9f43', '#ee5253'];

  const colors2 = [
    '#0abde3',
    '#10ac84',
    // '#5f27cd',
    '#222f3e',
  ];
  return (
    <>
      <div className="PickerContainer">
        <div className="Row1">
          {colors1.map((color) => (
            <ColorBlock key={color} color={color} onPick={props.onPick} />
          ))}
        </div>
        <div className="Row2">
          {colors2.map((color) => (
            <ColorBlock key={color} color={color} onPick={props.onPick} />
          ))}
        </div>
      </div>
    </>
  );
};

const ColorBlock = (props) => {
  return (
    <>
      <div
        className="ColorBlock"
        style={{ backgroundColor: props.color }}
        onClick={() => {
          props.onPick(props.color);
        }}
      />
    </>
  );
};

export default ColorPicker;
