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

  state = {
    loader: true,
    currentlyReading: [],
    wantToRead: [],
    read: [],
    messageBar: '',
  };

  componentDidMount() {
    getAll().then(data => data.forEach(book =>
        this.setState({
          [book.shelf]: [...this.state[book.shelf], book],
        })),
    ).then(e => this.setState({loader: false,}));
  }

  handleMoveTo = ({id, shelfIn, shelfOut}) => shelfIn
      ? this.moveBook(id, shelfIn, shelfOut)
      : this.removeBook(id, shelfOut);

  removeBook = (id, shelfOut) => {
    update({id}, 'false');
    this.setState({
      [shelfOut]: this.state[shelfOut].filter(book => book.id !== id),
      messageBar: `Book was removed from ${validName(shelfOut)}`,
    });
  };

  moveBook = (id, shelfIn, shelfOut) => {
    if (shelfIn !== shelfOut) {
      update({id}, shelfIn);
      const transfer = this.state[shelfOut].filter(book => {
        if (book.id !== id) {return book;}
        book.shelf = shelfIn;
        this.state[shelfIn].push(book);
      });

      this.setState({
        [shelfOut]: transfer,
        [shelfIn]: this.state[shelfIn],
        messageBar: `Book was added to ${validName(shelfIn)}`,
      });
    }
  };

  renderEmptyShelf = name => <EmptyShelf>{name} shelf is empty</EmptyShelf>;

  renderShelf = shelf =>
      <Shelf
          name={validName(shelf)}
          books={this.state[shelf]}
          handleMove={this.handleMoveTo.bind(this)}
      />;


  render() {
    const {loader, messageBar} = this.state;

    return (
        loader
            ? <WrapLoader><Loader size={120}/></WrapLoader>
            : <div>
          <Header title="MyReads"/>
          {SHELVES.map((shelf, i) =>
              <div key={i}>
                {this.state[shelf].length
                    ? this.renderShelf(shelf)
                    : this.renderEmptyShelf(validName(shelf))
                }
              </div>,
          )}
          <BtnAdd/>
          <SnackBar message={messageBar} open={!!messageBar}/>
        </div>
    );
  }
}

export default HomePage;