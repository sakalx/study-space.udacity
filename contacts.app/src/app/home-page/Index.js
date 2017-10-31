import React from 'react';
import * as callData from 'root/api/LocalStorage';

import TextField from 'material-ui/TextField';
import AddBtn from './components/AddBtn';
import FlatButton from 'material-ui/FlatButton';
import UserCard from './components/UserCard';
import TearSheet from './components/TearSheet';
import SnackBar from '../snack-bar/Index';

class HomePage extends React.Component {

  state = {
    contacts: [],
    query: '',
    openBar: false,
    messageBar: '',
  };

  componentDidMount() {
    this.setState({contacts: callData.getStorage()});
  }

  handleQuery = e => {
    this.setState({query: e.target.value.trim()});
  };

  handleShowAll = () => {
    this.setState({query: ''});
  };

  handleRemove = id => {
    this.setState({
      contacts: callData.remove(id),
      openBar: true,
      messageBar: `Contact was Successfully Removed`,
    });
  };

  render() {
    const {contacts, query, messageBar, openBar} = this.state;

    const showingContacts = (query) ? contacts.filter(obj =>
        new RegExp('\\b' + query, 'gi').test(obj.name)) : contacts;

    return (
        <main>
          <h1>myContacts</h1>
          <AddBtn/>
          <TextField
              onChange={this.handleQuery}
              hintText="What contact are you looking"
              floatingLabelText="Search..."
              fullWidth={true}/>
          {query &&
          <div style={{textAlign: 'center'}}>
            <span>Now Showing {showingContacts.length} of {contacts.length} total</span>
            <FlatButton onClick={this.handleShowAll} label="Show all" secondary={true}/>
          </div>}
          <TearSheet>
            <UserCard contacts={showingContacts} remove={this.handleRemove}/>
          </TearSheet>
          <SnackBar message={messageBar} open={openBar}/>
        </main>
    );
  }
}

export default HomePage;