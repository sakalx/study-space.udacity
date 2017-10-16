import React from 'react';
import PropTypes from 'prop-types';

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
    this.stausBook = props.status;
  }

  handleTouchTap = (event) => {
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
              <RadioButtonGroup name="shipSpeed" defaultSelected={this.stausBook}>
                <RadioButton value="currentlyReading" label="Currently Reading"/>
                <RadioButton value="wantToRead" label="Want to Read"/>
                <RadioButton value="read" label="Read"/>
              </RadioButtonGroup>
            </Menu>
          </Popover>
        </div>
    );
  }
}

ButtonMoveTo.propTypes = {
  status: PropTypes.string,
};

export default ButtonMoveTo;