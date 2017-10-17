import React from 'react';
import PropTypes from 'prop-types';
import {validName} from 'root/helper';

import Card from '../../components/card-book/Card';
import Divider from 'material-ui/Divider';

class ShelfName extends React.Component {
  constructor(props) {
    super();
    this.shelfName = props.shelfName;
    this.books = props.booksArr;
  }

  render() {
    return (
        <section>
          <h2>{validName(this.shelfName)}</h2>
          <Divider/>
          <ul style={{display: 'flex', flexWrap: 'wrap', listStyle: 'none'}}>
            {this.books.map((book, i) => <Card key={i} bookObj={book}/>)}
          </ul>
        </section>
    );
  }
}

ShelfName.propTypes = {
  shelfName: PropTypes.string,
  booksArr: PropTypes.array,
};

export default ShelfName;