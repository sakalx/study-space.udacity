import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/navigation/close';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const UserCard = props => {
  const {contacts, remove} = props;
  return <List>
    {contacts.map(contact =>
        <ListItem
            key={contact.id}
            primaryText={contact.name}
            secondaryText={contact.email}
            style={{paddingBottom: '20px'}}
            leftAvatar={<Avatar size={50} src={contact.img}/>}
            rightIconButton={
              <IconButton onClick={() => remove(contact.id)}
                          tooltip="Remove"
                          touch={true}
                          tooltipPosition="bottom-left">
                <ActionHome/>
              </IconButton>
            }/>,
    )}
  </List>;
};

UserCard.propTypes = {
  contacts: PropTypes.array,
  remove: PropTypes.func,
};

export default UserCard;
