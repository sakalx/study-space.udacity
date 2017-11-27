import React from 'react';
import {connect} from 'react-redux';
import {getAllCategory, toggleCategory} from 'root/app/actions/category';

import {List, ListItem} from 'material-ui/List';
import Toggle from 'material-ui/Toggle';

@connect(store => ({
  categories: store.categories,
}))

class CategoriesList extends React.Component {
  dispatch = this.props.dispatch;

  componentDidMount = () => this.dispatch(getAllCategory());

  handleToggle = name => this.dispatch(toggleCategory(name));

  render() {
    const {categories} = this.props;
    const categoriesKey = Object.keys(categories);

    return (
        <List>
          {categoriesKey.map(id =>
              <ListItem key={id}
                        primaryText={categories[id].name}
                        rightToggle={<Toggle toggled={categories[id].active}
                                             onToggle={() => this.handleToggle(id)}
                        />}
              />)
          }
        </List>
    );
  }
}

export default CategoriesList;