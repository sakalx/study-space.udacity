import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'root/theme';

import Sign404 from 'material-ui/svg-icons/alert/warning';

const Warning = styled.section`
  text-align: center;
  overflow: hidden;
`;
const Emoji = styled.div`
  transform: scale(2.1);
`;

const NotFound = ({title = 'Page'}) =>
    <Warning>
      <h1>404</h1>
      <Emoji>😜</Emoji>
      <h2>We are Sorry
        <br/>
        but the {title} you are looking for does not exist.
      </h2>
      <Sign404 style={{height: '160px', width: '160px'}}
               color={theme.palette.warningColor}
      />
    </Warning>;

NotFound.propTypes = {
  title: PropTypes.string,
};

export default NotFound;