import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #2c333b;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  width: 100%;
  color: #fff;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
`;

const FormGroup = styled.div`
  flex: 1;
`;

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #3a424e;
  border-radius: 5px;
  background-color: #3a424e;
  color: #fff;
  width: 100%;
  box-sizing: border-box;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #3a424e;
  border-radius: 5px;
  background-color: #3a424e;
  color: #fff;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #1F232C;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 15px;

  &:hover {
    background-color: #161B22;
  }
`;

const AutocompleteContainer = styled.div`
  position: relative;
`;

const AutocompleteItems = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #2c2c2c;
  border: 1px solid #444;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  max-height: 150px;
  overflow-y: auto;
  z-index: 99;
  display: ${({ active }) => (active ? 'block' : 'none')};
`;

const AutocompleteItem = styled.div`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-bottom: 1px solid #444;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #eee;

  &:hover {
    background-color: #666;
    color: #fff;
  }

  &::before {
    content: '🎮';
    margin-right: 10px;
    font-size: 16px;
  }

  &:last-child {
    border-bottom: none;
    border-radius: 0 0 5px 5px;
  }
`;

export {
    AutocompleteContainer,AutocompleteItem,AutocompleteItems,Button,Select,Input,
    Container,Form,FormGroup,FormRow,Label, Title
}