import React from 'react';
import styled from 'styled-components';
import {getAll, search, update} from 'root/api/BooksAPI';
import {validName} from 'root/app/helper';

import CircularProgress from 'material-ui/CircularProgress';
import Header from '../header/Index';
import ButtonBack from './components/ButtonBack';
import TextField from 'material-ui/TextField';
import Card from '../card-book/Index';
import SnackBar from '../snack-bar/Index';

const Loader = styled(CircularProgress)`
  margin-top: 20vh;
`;
const Wrap = styled.section`
  position: relative;
  text-align: center;
`;
const Btn = styled.div`
  position: absolute;
  top: -30px;
`;
const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

class SearchPage extends React.Component {
  state = {
    loader: false,
    booksFound: [],
    booksWeHave: [],
    messageBar: '',
  };

  componentDidMount() {
    getAll().then(data => this.setState({booksWeHave: data}));
  }

  handleAdd = ({id, shelfIn}) =>
      shelfIn ? this.addBook(id, shelfIn) : this.removeBook(id);

  handleUpdateInput = e => {
    const value = e.target.value;

    if (value.length > 2) {
      const validVal = value.match(/[A-Z]/gi);

      if (validVal) {
        this.setBooksFound([], true);
        search(validVal.join(''), 20).
            then(arrBooks => this.matchBook(arrBooks)).
            then(arrBooks => this.setBooksFound(arrBooks, false));
      }
    }
  };

  setBooksFound = (a, b) => {
    this.setState({booksFound: a, loader: b});
    return a;
  };

  matchBook = a => {
    if (Array.isArray(a))
      a.forEach(found =>
          this.state.booksWeHave.forEach(have =>
              (have.id === found.id) ? found['shelf'] = have.shelf : have));
    return a;
  };

  addBook = (id, shelfIn) => {
    update({id}, shelfIn);
    this.updateStatus(id, shelfIn);
    this.setState({
      booksFound: this.state.booksFound,
      messageBar: `Book was added to ${validName(shelfIn)}`,
    });
  };

  removeBook = id => {
    update({id}, 'false');
    this.updateStatus(id, 'false');
    this.setState({
      booksFound: this.state.booksFound,
      messageBar: `Book was removed`,
    });
  };

  updateStatus = (id, shelf) =>
      this.state.booksFound.find(book => {
        if (book.id === id) book.shelf = shelf;
      });

  render() {
    const {loader, booksFound, messageBar} = this.state;

    return (
        <Wrap>
          <Header title="AddBook"/>
          <Btn>
            <ButtonBack/>
          </Btn>
          <TextField
              hintText="What book are you looking"
              floatingLabelText="Search..."
              fullWidth={true}
              onChange={this.handleUpdateInput.bind(this)}
          />
          {loader
              ? <Loader size={120}/>
              : (booksFound.error)
                  ? <h1>Our Apologies nothing found 404</h1>
                  : <List>
                    {booksFound.map((book, i) =>
                        <Card key={i}
                              bookObj={book}
                              handleMove={this.handleAdd.bind(this)}/>,
                    )}
                  </List>
          }
          <SnackBar message={messageBar} open={!!messageBar}/>
        </Wrap>
    );
  }
}

export default SearchPage;