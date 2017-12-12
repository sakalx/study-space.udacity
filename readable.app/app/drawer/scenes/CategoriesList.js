import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {toggleCategory} from 'root/app/redux-core/actions/category';
import {getPostByCategories} from 'root/app/redux-core/actions/post';

import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

@connect(store => ({
  categories: store.categories,
}))

class CategoriesList extends React.Component {
  dispatch = this.props.dispatch;

  componentDidMount = () => {
    const {loadCategories} = this.props.match.params;

    const toggleDefault = () => {
      const {categories} = this.props;
      const categoriesKey = Object.keys(categories);
      const categoriesId = loadCategories.split(',');

      categoriesKey.forEach(id =>
          !categoriesId.includes(id) && this.dispatch(toggleCategory(id)),
      );
    };

    loadCategories && setTimeout(toggleDefault, 0);
  };

  handelOpenPageCategories = id => {
    this.dispatch(toggleCategory(id));

    const pushHistory = () => {
      const {categories, history} = this.props;
      const categoriesKeys = Object.keys(categories);
      const loadCategories = categoriesKeys.filter(id => categories[id].active);

      history.push(`/${loadCategories}`);

      this.dispatch(getPostByCategories(loadCategories));
    };

    setTimeout(pushHistory, 0);
  };

  renderTextField = (id, name) =>
      <TextField
          key={id}
          defaultValue={name}
          onChange={({target: {value}}) => this.props.checkEditField(id, value)}
          hintText='new Name...'
          floatingLabelText={`Edit ${name.toUpperCase()}`}
          fullWidth={true}
      />;

  render() {
    const {categories, checkDelete, showCheckBox, showEditField} = this.props;
    const categoriesKey = Object.keys(categories);

    return (
        <List>
          {categoriesKey.map(id =>
          !categories[id].deleted &&
          (showEditField
              ? this.renderTextField(id, categories[id].name)
              : <ListItem key={id}
                          primaryText={categories[id].name}
                          style={{paddingLeft: showCheckBox ? '72px' : '12px'}}
                          leftCheckbox={showCheckBox
                              ? <Checkbox id={id}
                                          onCheck={(e, v) => checkDelete(e, v)}/>
                              : <span/> }
                          rightToggle={<Toggle toggled={categories[id].active}
                                               onToggle={() => this.handelOpenPageCategories(
                                                   id)}
                          />}
              />))
          }
        </List>
    );
  }
}

CategoriesList.propTypes = {
  showCheckBox: PropTypes.bool,
  showEditField: PropTypes.bool,
  checkDelete: PropTypes.func,
  checkEditField: PropTypes.func,
};

export default withRouter(CategoriesList);