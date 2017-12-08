import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {addCategory, disableCategories} from 'root/app/redux-core/actions/category';

import IconButton from 'material-ui/IconButton';
import Categories from 'material-ui/svg-icons/navigation/apps';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';

import CategoriesList from './scenes/CategoriesList';

import DeleteBtn from './scenes/DeleteBtn';
import EditBtn from './scenes/EditBtn';
import AddBtn from './scenes/AddBtn';

const Wrap = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
`;
const Actions = styled.div`
  position: fixed;
  bottom: 25px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const styles = {
  largeIcon: {
    width: 50,
    height: 50,
  },
  large: {
    width: 80,
    height: 80,
  },
};

@connect(store => ({
  categories: store.categories,
}))

class CategoriesDrawer extends React.Component {
  dispatch = this.props.dispatch;

  state = {
    open: false,
    newCategory: false,
    deleteCategories: false,
  };

  handleAddCategory = () => {
    const {newCategory} = this.state;

    this.setState({newCategory: !newCategory});
    newCategory.length && this.dispatch(addCategory(newCategory));
  };

  handleEditCategory = () => {
    console.log(2);
  };

  handleCheckDelete = ({target: {id}}, checked) => {
    const {deleteCategories} = this.state;

    if (checked) {
      this.setState({
        deleteCategories: [...deleteCategories, id],
      });
    } else {
      const element = deleteCategories.indexOf(id);

      deleteCategories.splice(element, 1);
      this.setState({deleteCategories});
    }
  };

  handleDeleteCategories = () => {
    const {deleteCategories: deleteArr} = this.state;

    this.setState({deleteCategories: !deleteArr});
    deleteArr.length && this.dispatch(disableCategories(deleteArr));
  };

  render() {
    const {open, newCategory, deleteCategories} = this.state;

    return (
        <Wrap>
          <IconButton
              touch={true}
              onClick={() => this.setState({open: !this.state.open})}
              tooltipPosition="bottom-right"
              iconStyle={styles.largeIcon}
              style={styles.large}>
            <Categories/>
          </IconButton>
          <Drawer onRequestChange={(open) => this.setState({open})}
                  docked={false}
                  width={230}
                  open={open}>
            <h2>Categories</h2>
            <CategoriesList showCheckBox={!!deleteCategories}
                            checkDelete={this.handleCheckDelete}
            />
            {
              newCategory &&
              <TextField
                  onChange={({target}) => this.setState({newCategory: target.value})}
                  hintText={'Name'}
                  floatingLabelText={'New Category'}
                  fullWidth={true}
              />
            }
            <Actions>
              <DeleteBtn disabled={!!newCategory}
                         deleteCategories={this.handleDeleteCategories}
                         deleteCount={deleteCategories.length}
              />
              <EditBtn disabled={!!newCategory || !!deleteCategories}
                       editCategory={this.handleEditCategory}
              />
              <AddBtn disabled={!!deleteCategories}
                      addCategory={this.handleAddCategory}
                      open={!!newCategory}
              />
            </Actions>
          </Drawer>
        </Wrap>
    );
  }
}

export default CategoriesDrawer;