import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';

import ButtonMoveTo from './ButtonMoveTo';
import Info from './Info';

const style = {
  minHeight: 450,
  width: 230,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  position: 'relative',
};

class Card extends React.Component {
  constructor(props) {
    super();
    this.book = props.bookObj;
  }

  render() {
    return (
        <section>
          <Paper style={style} zDepth={1}>
            <Info bookObj={this.book}/>
            <h3>{this.book.title}</h3>
            {(this.book.authors) ?
                <h4 style={{color: '#ff80ab'}}>{this.book.authors.join(` & `)}</h4> :
                <h4 style={{color: '#ff80ab'}}>Unknown writer</h4>}
            <ButtonMoveTo bookObj={this.book}/>
          </Paper>
        </section>
    );
  }
}

Card.propTypes = {
  bookObj: PropTypes.object,
};

export default Card;