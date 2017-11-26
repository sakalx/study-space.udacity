import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const WrapMenu = styled(DropDownMenu)`
  position: absolute !important;
  top: 40px;
  right: 0;
`;

class MenuSort extends React.Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    const {value} = this.state;
    const {sortBy} = this.props;

    return (
        <WrapMenu value={value} onChange={this.handleChange}>
          <MenuItem value={1}
                    onClick={() => sortBy('voteUp')}
                    primaryText="Sort By Highest Votes"
          />
          <MenuItem value={2}
                    onClick={() => sortBy('voteUp', false)}
                    primaryText="Sort By Lowest Votes"
          />
          <MenuItem value={3}
                    onClick={() => sortBy('voteDown', false)}
                    primaryText="Sort By Negative Votes"
          />
          <MenuItem value={4}
                    onClick={() => sortBy('timestamp')}
                    primaryText="Sort By Newest"
          />
          <MenuItem value={5}
                    onClick={() => sortBy('timestamp', false)}
                    primaryText="Sort By Oldest"
          />
          <MenuItem value={6}
                    onClick={() => sortBy('title')}
                    primaryText="Sort By Title"
          />
          <MenuItem value={7}
                    onClick={() => sortBy('author')}
                    primaryText="Sort By Author"
          />
        </WrapMenu>
    );
  }
}

MenuSort.propTypes = {
  sortBy: PropTypes.func,
};

export default MenuSort;