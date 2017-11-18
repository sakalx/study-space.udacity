import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Paper from 'material-ui/Paper';

const Wrap = styled(Paper)`
  width: 98vw;
  text-align: center;
  display: inline-block;
  background: #2793e8 !important;
  color: #303030 !important;
`;

const Header = props => (
    <Wrap zDepth={5}>
      <h1>{props.title}</h1>
    </Wrap>
);

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;