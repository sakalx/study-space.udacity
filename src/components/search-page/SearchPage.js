import React from 'react';

import {getAll, search} from 'root/api/BooksAPI';

import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import ButtonBack from './ButtonBack';
import Card from '../card-book/Card';

class SearchPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      books: [],
      circularProgress: false,

    };
  }

  handleValidInput = v => v.match(/[A-Z]/gi);

  handleSetState = (a, b) => this.setState({books: a, circularProgress: b});

  handleUpdateInput = e => {
    if (e.target.value.length > 2) {
      const validVal = this.handleValidInput(e.target.value);
      if (validVal) {
        this.handleSetState([], true);
        search(validVal.join(''), 20).
            then(arrBooks => this.handleSetState(arrBooks, false));
      } else { alert('Incorrect Data'); }
    }
  };

  render() {
    return (
        <section style={{textAlign: 'center'}}>
          <ButtonBack/>
          <h1>Add Book</h1>
          <TextField
              hintText="What book are you looking"
              floatingLabelText="Search..."
              fullWidth={true}
              onChange={this.handleUpdateInput.bind(this)}
          />

          {(this.state.circularProgress) ?
              <CircularProgress style={{marginTop: '30%'}} size={120}/> : <span/>}

          {(this.state.books.error) ? <h1>Our Apologies nothing found 404</h1> :
              <ul style={{display: 'flex', flexWrap: 'wrap', listStyle: 'none'}}>
                {this.state.books.map((book, i) => <Card key={i} bookObj={book}/>)}
              </ul>}
        </section>
    );
  }
}

export default SearchPage;