import React from 'react';
import styled from 'styled-components';
import {getAll, update} from 'root/api/BooksAPI';
import {SHELVES, validName} from 'root/app/helper';

import CircularProgress from 'material-ui/CircularProgress';
import Header from '../header/Index';
import Shelf from './components/Shelf';
import BtnAdd from './components/ButtonAdd';
import SnackBar from '../snack-bar/Index';

const EmptyShelf = styled.h2`
  color: #ff80ab;
`;
const WrapLoader = styled.div`
  display: flex;
  height: 100vh;
`;
const Loader = styled(CircularProgress)`
  margin: auto;
`;

class HomePage extends React.Component {

  constructor(props) {
    super();
    this.state = {
      loader: true,
      currentlyReading: [],
      wantToRead: [],
      read: [],
      messageBar: '',
      openBar: false,
    };
  }

  emptyShelf = name => <EmptyShelf>{name} shelf is empty</EmptyShelf>;

  componentWillMount() {
    getAll().
        then(data => data.forEach(book => this.state[book.shelf].push(book))).
        then(i => this.setState({
          currentlyReading: this.state.currentlyReading,
          wantToRead: this.state.wantToRead,
          read: this.state.read,
          loader: false,
        }));
  }

  removeBook = (id, shelfOut) => {
    update({id}, 'false');
    this.setState({
      messageBar: `Book was removed`,
      openBar: true,
    });
    this.setState({[shelfOut]: this.state[shelfOut].filter(book => book.id !== id)});
  };

  moveBook = (id, shelfIn, shelfOut) => {
    if (shelfIn !== shelfOut) {
      update({id}, shelfIn);
      const transfer = this.state[shelfOut].filter(book => {
        if (book.id !== id) { return book; }
        book.shelf = shelfIn;
        this.state[shelfIn].push(book);
      });

      this.setState({
        [shelfOut]: transfer,
        [shelfIn]: this.state[shelfIn],
        messageBar: `Book was added to ${validName(shelfIn)}`,
        openBar: true,
      });
    }
  };

  handleMoveTo = ({id, shelfIn, shelfOut}) =>
      (shelfIn) ? this.moveBook(id, shelfIn, shelfOut) : this.removeBook(id, shelfOut);

  render() {

    return (this.state.loader) ? <WrapLoader>
      <Loader size={120}/>
    </WrapLoader> : <div>
      <Header title="MyReads"/>

      {SHELVES.map((shelf, i) =>
          <div key={i}>
            {
              (this.state[shelf].length) ? <Shelf
                  name={validName(shelf)}
                  books={this.state[shelf]}
                  handleMove={this.handleMoveTo.bind(this)}/> : this.emptyShelf(
                  validName(shelf))
            }
          </div>,
      )}

      <BtnAdd/>
      <SnackBar message={this.state.messageBar} open={this.state.openBar}/>
    </div>;
  }
}

export default HomePage;