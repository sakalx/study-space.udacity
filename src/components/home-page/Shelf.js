import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../components/card-book/Card';
import Divider from 'material-ui/Divider';

class ShelfName extends React.Component {
  constructor(props) {
    super();
    this.shelfName = props.shelfName;
    this.books = props.booksArr;
  }

  validShelfName() {
    return this.shelfName[0].toUpperCase() +
        this.shelfName.slice(1).replace(/[A-Z]/g, ' $&');
  }

  render() {
    return (
        <section>
          <h2>{this.validShelfName()}</h2>
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