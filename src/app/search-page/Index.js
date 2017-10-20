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
  constructor(props) {
    super();
    this.state = {
      loader: false,
      booksFound: [],
      booksWeHave: [],
      messageBar: '',
      openBar: false,
    };
  }

  componentWillMount() {
    getAll().then(data => this.setState({booksWeHave: data}));
  }

  updateStatus = (id, shelf) =>
      this.state.booksFound.find(book => {if (book.id === id) book.shelf = shelf;});

  addBook = (id, shelfIn) => {
    update({id}, shelfIn);
    this.updateStatus(id, shelfIn);
    this.setState({
      booksFound: this.state.booksFound,
      messageBar: `Book was added to ${validName(shelfIn)}`,
      openBar: true,
    });
  };

  removeBook = id => {
    update({id}, 'false');
    this.updateStatus(id, 'false');
    this.setState({
      booksFound: this.state.booksFound,
      messageBar: `Book was removed`,
      openBar: true,
    });
  };

  handleAdd = ({id, shelfIn}) =>
      (shelfIn) ? this.addBook(id, shelfIn) : this.removeBook(id);

  validInput = v => v.match(/[A-Z]/gi);

  matchBook = a => {
    if (Array.isArray(a))
      a.forEach(found =>
          this.state.booksWeHave.forEach(have =>
              (have.id === found.id) ? found['shelf'] = have.shelf : have));
    return a;
  };

  setBooksFound = (a, b) => {
    this.setState({booksFound: a, loader: b});
    return a;
  };

  handleUpdateInput = e => {
    if (e.target.value.length > 2) {
      const validVal = this.validInput(e.target.value);
      if (validVal) {
        this.setBooksFound([], true);
        search(validVal.join(''), 20).
            then(arrBooks => this.matchBook(arrBooks)).
            then(arrBooks => this.setBooksFound(arrBooks, false));
      }
    }
  };

  render() {

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
              onChange={this.handleUpdateInput.bind(this)}/>

          {(this.state.loader) ? <Loader size={120}/> : (this.state.booksFound.error) ?
              <h1>Our Apologies nothing found 404</h1> : <List>
                {this.state.booksFound.map((book, i) =>
                    <Card key={i}
                          bookObj={book}
                          handleMove={this.handleAdd.bind(this)}/>,
                )}
              </List>
          }

          <SnackBar message={this.state.messageBar} open={this.state.openBar}/>
        </Wrap>
    );
  }
}

export default SearchPage;