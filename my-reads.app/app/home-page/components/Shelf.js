import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Card from '../../card-book/Index';
import Divider from 'material-ui/Divider';

const Wrapper = styled.ul`
 display: flex;
 flex-wrap: wrap;
`;

const Shelf = props => {
  const {name, books, handleMove} = props;

  return (
      <section>
        <h2>{name}</h2>
        <Divider/>
        <Wrapper>
          {books.map((book, i) =>
              <Card key={i} bookObj={book} handleMove={handleMove}/>,
          )}
        </Wrapper>
      </section>
  );
};

Shelf.propTypes = {
  name: PropTypes.string,
  books: PropTypes.array,
  handleMove: PropTypes.func,
};

export default Shelf;