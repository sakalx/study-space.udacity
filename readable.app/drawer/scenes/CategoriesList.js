import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAllCategory, toggleCategory} from 'root/app/redux-core/actions/category';

import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

@connect(store => ({
  categories: store.categories,
}))

class CategoriesList extends React.Component {
  dispatch = this.props.dispatch;

  componentDidMount = () => this.dispatch(getAllCategory());

  handleToggle = name => this.dispatch(toggleCategory(name));

  render() {
    const {categories, checkDelete, showCheckBox} = this.props;
    const categoriesKey = Object.keys(categories);

    return (
        <List>
          {categoriesKey.map(id =>
          !categories[id].deleted &&
          <ListItem key={id}
                    primaryText={categories[id].name}
                    style={{paddingLeft: showCheckBox ? '72px' : '12px'}}
                    leftCheckbox={showCheckBox
                        ? <Checkbox id={id}
                                    onCheck={(e, v) => checkDelete(e, v)}/>
                        : <span/> }
                    rightToggle={<Toggle toggled={categories[id].active}
                                         onToggle={() => this.handleToggle(id)}
                    />}
          />)
          }
        </List>
    );
  }
}

CategoriesList.propTypes = {
  showCheckBox: PropTypes.bool,
  checkDelete: PropTypes.func,
};

export default CategoriesList;

