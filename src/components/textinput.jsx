import { useState } from 'react';

function TextInput(props) {
  //props
  //fieldName
  //onSubmit

  const inputPlaceholder = props.fieldName;
  const [inputText, setInputText] = useState(inputPlaceholder);

  var handleSubmit = (e) => {
    e.preventDefault();
    if (inputText !== '') {
      // console.log(`${props.fieldName}: '${inputText}'`);
      props.onSubmit(inputText);
      setInputText('');
    }
    return false;
  };

  var handleFocus = (e) => {
    if (e.target.value == inputPlaceholder) {
      setInputText('');
    }
  };

  var handleBlur = (e) => {
    if (e.target.value == '') {
      setInputText(inputPlaceholder);
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
        />
      </label>
    </form>
  );
}

export default TextInput;
