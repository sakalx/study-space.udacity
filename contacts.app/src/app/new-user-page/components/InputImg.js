import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 70%;
  opacity: 0;
  cursor: pointer;
`;

const InputImg = props =>
    <Input type="file" onChange={props.loadImg.bind(this)}/>;

InputImg.propTypes = {
  loadImg: PropTypes.func,
};

export default InputImg;

