import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {getAllCategory} from 'root/app/redux-core/actions/category';
import {openSnack} from 'root/app/redux-core/actions/snackInfo';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import WarningIcon from 'material-ui/svg-icons/alert/warning';

const CategoryMenu = styled(DropDownMenu)`
  position: absolute !important;
  top: 44px;
  right: 1px;
`;

@connect(store => ({
  categories: store.categories,
}))

class SelectCategory extends React.Component {

  componentDidMount = () => this.props.dispatch(getAllCategory());

  handleChoiceCategory = (e, i, value) => this.props.handleSelect(value);

  render() {
    const {categories, requiredField, currentCategory} = this.props;
    const categoryKey = Object.keys(categories);
    const warningIcon = requiredField && <WarningIcon color={'#FF8A80'}/>;

    return (
        <CategoryMenu value={currentCategory}
                      onChange={this.handleChoiceCategory}>
          <MenuItem
              value=''
              disabled={true}
              primaryText={<div>Select Category {warningIcon}</div>}
          />
          <Divider />
          {
            categoryKey.map(id =>
                !categories[id].deleted &&
                <MenuItem
                    key={id}
                    id={id}
                    value={id}
                    primaryText={categories[id].name.toUpperCase()}
                />,
            )
          }
        </CategoryMenu>
    );
  }
}

SelectCategory.propTypes = {
  handleSelect: PropTypes.func,
  requiredField: PropTypes.bool,
  currentCategory: PropTypes.string,
};

export default SelectCategory;