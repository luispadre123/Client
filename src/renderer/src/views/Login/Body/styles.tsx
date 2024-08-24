import styled from "styled-components";
import { FormProps } from "./interface";

const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  gap: 1rem;

  .input-container {
    display: flex;
    flex-direction: column;
    width: 100%; 
  }

  label {
    margin-bottom: 0.5rem; 
    text-align: left;
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
  }

  input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #3a424e;
    color: #fff;
    font-size: 14px;
  }

  button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #1f242c;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #161B22;
  }
`;

export {
    Form
}