import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {SHELVES, validName} from 'root/app/helper';

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionMoveTo from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const Wrap = styled.div`
  position: absolute;
  bottom: -15px;
  right: -15px;
`;
const Title = styled.span`
  color: #888;
`;
const Hr = styled(Divider)`
  height: 2px !important;
  margin: 5px 0 !important;
`;
const MoveMenu = styled(Menu)`
  padding: 15px !important;
`;

class ButtonMoveTo extends React.Component {

  state = {open: false};

  handleTouchTap = event => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => this.setState({open: false});

  render() {
    const {handleMove} = this.props;
    const {shelf, id} = this.props.bookObj;

    return (
        <Wrap>
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
            <MoveMenu>
              <Title>Move to...</Title>
              <Hr/>
              <RadioButtonGroup name="shipSpeed"
                                defaultSelected={shelf}
              >
                {SHELVES.map((e, i) =>
                    <RadioButton
                        key={i} label={validName(e)} value={e}
                        onClick={handleMove.bind(this,
                            {
                              id: `${id}`,
                              shelfIn: `${e}`,
                              shelfOut: `${shelf}`,
                            },
                        )}
                    />,
                )}
                <RadioButton
                    label="Remove" value="remove"
                    onClick={handleMove.bind(this,
                        {
                          id: `${id}`,
                          shelfOut: `${shelf}`,
                        },
                    )}
                />
              </RadioButtonGroup>
            </MoveMenu>
          </Popover>
        </Wrap>
    );
  }
}

ButtonMoveTo.propTypes = {
  bookObj: PropTypes.object,
  handleMove: PropTypes.func,
};

export default ButtonMoveTo;