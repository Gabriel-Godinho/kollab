import React from "react";
import { StyledInput } from "./style";

const Input = ({ name, placeholder, onChange, type }) => {
  return (
    <StyledInput
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
    />
  );
};

export default Input;
