import { useEffect } from 'react';
import { useState, useRef } from 'react';
import './inputs.css';

function UsernameInput(props) {
  //props
  //fieldName
  //onSubmit

  const [inputText, setInputText] = useState(props.placeholder);
  var fieldRef = useRef(null);

  var handleSubmit = (e) => {
    e.preventDefault();
    if (inputText !== '' && inputText !== props.placeholder) {
      // console.log(`${props.fieldName}: '${inputText}'`);
      props.onSubmit(inputText);
      fieldRef.current.blur();
    }
    return false;
  };

  var handleFocus = (e) => {
    // if (e.target.value == props.placeholder) {
    setInputText('');
    // }
  };

  var handleBlur = (e) => {
    if (e.target.value == '') {
      setInputText(props.placeholder);
    } else {
      setInputText(inputText);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          style={{ color: props.color }}
          name="usernameInput"
          value={inputText}
          onChange={(e) => {
            if (e.target.value.length <= 15) {
              setInputText(e.target.value);
            }
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete={'off'}
          ref={fieldRef}
        />
      </label>
    </form>
  );
}

export default UsernameInput;
