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
      booksFound: [],
      booksWeHave: [],
      circularProgress: false,
    };
  }

  componentWillMount() {
    getAll().then(data => this.setState({booksWeHave: data}));
  }

  handleValidInput = v => v.match(/[A-Z]/gi);

  handleSetState = (a, b) => {
    this.setState({booksFound: a, circularProgress: b});
    return a;
  };

  handleMatchBook = a => {
    if (Array.isArray(a))
      a.forEach(found =>
          this.state.booksWeHave.forEach(have =>
              (have.id === found.id) ? found['shelf'] = have.shelf : have));
    return a;
  };

  handleUpdateInput = e => {
    if (e.target.value.length > 2) {
      const validVal = this.handleValidInput(e.target.value);
      if (validVal) {
        this.handleSetState([], true);
        search(validVal.join(''), 20).
            then(arrBooks => this.handleMatchBook(arrBooks)).
            then(arrBooks => this.handleSetState(arrBooks, false)).
            catch(err => alert(`we have some issue: ${err.name} ${err.message}`));
      }
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
              <CircularProgress style={{marginTop: '15vh'}} size={120}/> : <span/>}

          {(this.state.booksFound.error) ? <h1>Our Apologies nothing found 404</h1> :
              <ul style={{display: 'flex', flexWrap: 'wrap', listStyle: 'none'}}>
                {
                  this.state.booksFound.map((book, i) => {
                    return <Card key={i} bookObj={book}/>;
                  })}
              </ul>}
        </section>
    );
  }
}

export default SearchPage;