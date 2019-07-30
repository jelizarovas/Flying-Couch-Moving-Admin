import React from "react";

const InputTextArea = props => {
  // const defaultProps = {
  //   type: "text"
  // };
  const { name, label, onChange, value, type } = props;
  return (
    <div>
      <label>
        {label}:
        <textarea type={type} name={name} onChange={onChange} value={value} />
      </label>
    </div>
  );
};

export default InputTextArea;
