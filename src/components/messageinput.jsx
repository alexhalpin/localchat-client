import { useState, useRef } from 'react';
import './inputs.css';

function MessageInput(props) {
  //props
  //fieldName
  //onSubmit

  const [inputText, setInputText] = useState(props.placeholder);
  var fieldRef = useRef(null);

  var handleSubmit = (e) => {
    e.preventDefault();
    if (inputText !== '') {
      // console.log(`${props.fieldName}: '${inputText}'`);
      props.onSubmit(inputText);
      // fieldRef.current.blur();
      setInputText('');
    }
    // return false;
  };

  var handleFocus = (e) => {
    if (e.target.value == props.placeholder) {
      setInputText('');
    }
  };

  var handleBlur = (e) => {
    if (e.target.value == '') {
      setInputText(props.placeholder);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          name="messageInput"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete={'off'}
          ref={fieldRef}
        />
      </label>
    </form>
  );
}

export default MessageInput;
