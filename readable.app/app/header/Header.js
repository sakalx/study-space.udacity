import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Paper from 'material-ui/Paper';

const Wrap = styled(Paper)`
  width: 98.5vw;
  text-align: center;
  display: inline-block;
  background: #2793e8 !important;
  color: #303030 !important;
  padding: 0 60px 15px;
`;

const Header = ({title}) =>
    <Wrap zDepth={5}>
      <h2>{title}</h2>
    </Wrap>;

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;