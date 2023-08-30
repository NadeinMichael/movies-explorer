import { useState } from 'react';

import './EditableSpan.css';

const EditableSpan = ({ editMode, title, handlerInputChange, inputId, type }) => {
  const [inputValue, setInputValue] = useState(title);

  const onChangeTitleHandler = (e) => {
    setInputValue(e.target.value);
  };

  const fixInputChange = () => {
    handlerInputChange(inputValue, inputId);
  };

  return editMode ? (
    <input
      className="editable-input"
      type={type}
      required
      autoFocus
      value={inputValue}
      onChange={onChangeTitleHandler}
      onBlur={fixInputChange}
    />
  ) : (
    <span className="editable-span">{title}</span>
  );
};

export default EditableSpan;
