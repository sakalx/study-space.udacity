import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {getAllCategory} from 'root/app/redux-core/actions/category';
import {openSnack} from 'root/app/redux-core/actions/snackInfo';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const CategoryMenu = styled(DropDownMenu)`
  position: absolute !important;
  top: 44px;
  right: 1px;
`;

@connect(store => ({
  categories: store.categories,
}))

class SelectCategory extends React.Component {
  dispatch = this.props.dispatch;

  state = {
    value: 0,
  };

  componentDidMount = () => this.dispatch(getAllCategory());

  handleChoiceCategory = ({target}, index, value) => {
    const {id} = target.parentElement.parentElement.parentElement;
    this.setState({value});
    this.props.handleSelect(id);
  };

  render() {
    const {value} = this.state;
    const {categories} = this.props;
    const categoryKey = Object.keys(categories);

    return (
        <CategoryMenu value={value}
                      onChange={this.handleChoiceCategory}>

          <MenuItem
              value={0}
              disabled={true}
              primaryText='Select Category'

          />
          <Divider />
          {
            categoryKey.map((id, index) => {
                  return <MenuItem
                      key={id}
                      id={id}
                      value={index + 1}
                      primaryText={categories[id].name}
                  />;
                },
            )
          }
        </CategoryMenu>
    );
  }
}

SelectCategory.propTypes = {
  handleSelect: PropTypes.func,
};

export default SelectCategory;