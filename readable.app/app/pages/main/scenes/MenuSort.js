import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {openSnack} from 'root/app/redux-core/actions/snackInfo';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const SortMenu = styled(DropDownMenu)`
  position: absolute !important;
  top: 44px;
  right: 1px;
`;

@connect(store => store)

class MenuSort extends React.Component {
  dispatch = this.props.dispatch;

  state = {
    value: 1,
  };

  handleChange = (event, index, value) => {
    this.setState({value});
    this.dispatch(openSnack('Sorted Completed'));
  };

  render() {
    const {value} = this.state;
    const {sortBy} = this.props;

    return (
        <SortMenu value={value}
                  onChange={this.handleChange}>
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
        </SortMenu>
    );
  }
}

MenuSort.propTypes = {
  sortBy: PropTypes.func,
};

export default MenuSort;