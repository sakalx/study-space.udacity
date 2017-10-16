import React from 'react';

import {getAll} from 'root/api/BooksAPI';

import CircularProgress from 'material-ui/CircularProgress';

import Header from './Header';
import Shelf from './Shelf';
import BtnAdd from './ButtonAdd';

const shelves = ['currentlyReading', 'wantToRead', 'read'];

class HomePage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      books: false,
    };
  }

  componentWillMount() {
    getAll().
        then(data => this.setState({books: data.map(obj => obj)}));
  }

  render() {
    if (!this.state.books) {
      return (
          <div style={{display: 'flex', height: '100vh'}}>
            <CircularProgress style={{margin: 'auto'}} size={120}/>
          </div>
      );
    }

    return (
        <div>
          <Header/>
          {shelves.map((shelf, i) => {
            const books = this.state.books.filter(book => book.shelf === shelf);
            return <Shelf key={i} shelfName={shelf} booksArr={books}/>;
          })}
          <BtnAdd/>
        </div>
    );
  }
}

export default HomePage;

