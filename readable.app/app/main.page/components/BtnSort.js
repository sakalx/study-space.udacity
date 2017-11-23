import React from 'react';
import styled from 'styled-components';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const WrapMenu = styled(DropDownMenu)`
  position: absolute !important;
  top: 40px;
  right: 0;
`;

class DropDownMenuOpenImmediateExample extends React.Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    const {value} = this.state;
    return (
        <WrapMenu value={value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Sort By Votes"/>
          <MenuItem value={2} primaryText="Sort By Newest"/>
          <MenuItem value={3} primaryText="Sort By Oldest"/>
          <MenuItem value={4} primaryText="Sort By Title"/>
          <MenuItem value={5} primaryText="Sort By Author"/>
        </WrapMenu>
    );
  }
}

export default DropDownMenuOpenImmediateExample;