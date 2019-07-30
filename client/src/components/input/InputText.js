import React from "react";

const InputText = props => {
  // const defaultProps = {
  //   type: "text"
  // };
  const { name, label, onChange, onBlur, value, type, step } = props;
  return (
    <div>
      <label>
        {label} : {value}
        <input type={type} name={name} onChange={onChange} value={value} step={step} onBlur={onBlur} />
      </label>
    </div>
  );
};

export default InputText;
