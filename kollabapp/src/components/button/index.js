import React from "react";
import { StyledButton } from "./style";

const Button = ({ type, text, onClick, disabled }) => {
  return (
    <StyledButton 
      type={type} 
      text={text} 
      onClick={onClick} 
      disabled={disabled}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
