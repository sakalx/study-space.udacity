import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Paper from 'material-ui/Paper';
import ButtonMoveTo from './scenes/ButtonMoveTo';
import Info from './scenes/Info';

const Wrap = styled(Paper)`
  min-height: 450px;
  width: 230px;
  margin: 20px;
  text-align: center;
  position: relative;
`;
const Authors = styled.h4`
  color: #ff80ab;
`;

const Card = props =>
    <Wrap zDepth={4}>
      <Info bookObj={props.bookObj}/>
      <h3>{props.bookObj.title}</h3>
      {
        props.bookObj.authors
            ? <Authors>{props.bookObj.authors.join(` & `)}</Authors>
            : <Authors>Unknown writer</Authors>
      }
      <ButtonMoveTo bookObj={props.bookObj}
                    handleMove={props.handleMove}
      />
    </Wrap>;

Card.propTypes = {
  bookObj: PropTypes.object,
  handleMove: PropTypes.func,
};

export default Card;