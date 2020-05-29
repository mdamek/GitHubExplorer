import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  padding: 0.25em 1em;
  outline: 0;
  margin-top: 25px;
  width: 10%;
  font-size: 20px;

  &:hover{
    outline: none !important;
    outline-offset: none !important;
    cursor: pointer;
  }
`;

export default Button;
