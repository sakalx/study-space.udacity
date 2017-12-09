import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAllCategory, toggleCategory} from 'root/app/redux-core/actions/category';

import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

@connect(store => ({
  categories: store.categories,
}))

class CategoriesList extends React.Component {
  dispatch = this.props.dispatch;

  componentDidMount = () => this.dispatch(getAllCategory());

  handleToggle = name => this.dispatch(toggleCategory(name));

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
                                               onToggle={() => this.handleToggle(id)}
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

export default CategoriesList;