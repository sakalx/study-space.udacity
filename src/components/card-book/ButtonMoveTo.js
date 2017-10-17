import React from 'react';
import PropTypes from 'prop-types';

import {SHELVES, validName} from 'root/helper';

import {update} from 'root/api/BooksAPI';

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionMoveTo from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const style = {
  position: 'absolute',
  bottom: -15,
  right: -15,
};

class ButtonMoveTo extends React.Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
    };
    this.book = props.bookObj;
  }

  handleTouchTap = event => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleUpdateStatus = (id, shelf) => {
    console.log(shelf);
    console.log(id);
    update({id: 'nggnmAEACAAJ'}, 'currentlyReading').
        then(response => console.log(response));
  };

  render() {
    return (
        <div style={style}>
          <FloatingActionButton onClick={this.handleTouchTap} mini={true}>
            <ActionMoveTo/>
          </FloatingActionButton>
          <Popover
              zDepth={3}
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
          >
            <Menu style={{padding: '5px'}}>
              <span style={{color: '#888'}}> Move to... </span>
              <Divider style={{height: '2px'}}/>
              <RadioButtonGroup defaultSelected={this.book.shelf} name="shipSpeed">
                {SHELVES.map(
                    (e, i) => <RadioButton key={i} value={e} label={validName(e)}/>)}
                <RadioButton
                    onClick={this.handleUpdateStatus.bind(this, `${this.book.id}`,
                        'read')}
                    value="remove" label="Remove"/>
              </RadioButtonGroup>
            </Menu>
          </Popover>
        </div>
    );
  }
}

ButtonMoveTo.propTypes = {
  bookObj: PropTypes.object,
};

export default ButtonMoveTo;