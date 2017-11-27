import React from 'react';
import styled from 'styled-components';

import IconButton from 'material-ui/IconButton';
import Categories from 'material-ui/svg-icons/navigation/apps';
import Drawer from 'material-ui/Drawer';
import CategoriesList from './CategoriesList';

const Wrap = styled.div`
  position: absolute;
  top: 7px;
  left: 0;
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

class BtnCategories extends React.Component {
  state = {
    open: false,
  };

  handleDrawer = () => this.setState({open: !this.state.open});

  render() {
    const {open} = this.state;

    return (
        <Wrap>
          <IconButton
              touch={true}
              onClick={this.handleDrawer}
              tooltipPosition="bottom-right"
              iconStyle={styles.largeIcon}
              style={styles.large}>
            <Categories/>
          </IconButton>
          <Drawer onRequestChange={(open) => this.setState({open})}
                  docked={false} width={200}
                  open={open}>
            <h2>Categories</h2>
            <CategoriesList/>
          </Drawer>
        </Wrap>
    );
  }
}

export default BtnCategories;