import React from 'react';
import styled from 'styled-components';

import Paper from 'material-ui/Paper';
import BackBtn from './BackBtn';

const Wrap = styled(Paper)`
  width: 100%;
  text-align: center;
  display: inline-block;
  background: #2793e8 !important;
  color: #303030 !important;
`;
const Btn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const Header = () =>
    <Wrap zDepth={5}>
      <Btn>
        <BackBtn/>
      </Btn>
      <h1>Add New Contact</h1>
    </Wrap>;

export default Header;