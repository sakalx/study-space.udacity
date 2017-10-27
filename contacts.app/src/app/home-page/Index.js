import React from 'react';
import * as callData from 'root/api/LocalStorage';

import TextField from 'material-ui/TextField';
import UserCard from '../user-card/Index';
import TearSheet from './components/TearSheet';

class HomePage extends React.Component {
  constructor(props) {
    super();
    this.state = {contacts: []};
  }

  componentWillMount() {
    this.setState({contacts: callData.lStorage()});
  }

  handleRemove = id => this.setState({contacts: callData.remove(id)});

  render() {
    console.log(this.state.contacts);
    return (
        <main>
          <h1>Contacts</h1>
          <TextField
              hintText="What contact are you looking"
              floatingLabelText="Search..."
              fullWidth={true}
          />
          <TearSheet>
            <UserCard contacts={this.state.contacts}
                      remove={this.handleRemove.bind(this)}/>
          </TearSheet>
        </main>
    );
  }
}

export default HomePage;