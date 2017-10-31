import React from 'react';
import PropTypes from 'prop-types';
import theme from 'root/theme';

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Remove from 'material-ui/svg-icons/navigation/close';
import Drawer from 'material-ui/Drawer';

class UserCard extends React.Component {

  state = {
    open: false,
    name: '',
    email: '',
    img: '',
  };

  handleDrawer = ({name, email, img}) => {
    this.setState({
      open: !this.state.open,
      name, email, img,
    });
  };

  render() {
    const {contacts, remove} = this.props;
    const {open, name, email, img} = this.state;

    return (
        <div>
          <List>
            {contacts.map(contact =>
                <ListItem
                    key={contact.id}
                    onClick={this.handleDrawer.bind(this, contact)}
                    primaryText={contact.name}
                    secondaryText={contact.email}
                    style={{paddingBottom: '20px'}}
                    leftAvatar={<Avatar size={50} src={contact.img}/>}
                    rightIconButton={
                      <IconButton onClick={() => remove(contact.id)}
                                  tooltip="Remove"
                                  touch={true}
                                  tooltipPosition="bottom-left">
                        <Remove/>
                      </IconButton>
                    }/>,
            )}
          </List>

          <Drawer onRequestChange={(open) => this.setState({open})}
                  docked={false} width={200}
                  open={open}>
            <Avatar size={200} src={img}/>
            <h1>{name}</h1>
            <span style={{color: theme.palette.accent1Color}}>{email}</span>
          </Drawer>
        </div>
    );
  }
}

UserCard.propTypes = {
  contacts: PropTypes.array,
  remove: PropTypes.func,
};

export default UserCard;