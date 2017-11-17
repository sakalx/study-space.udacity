import React from 'react';

import IconButton from 'material-ui/IconButton';
import Categories from 'material-ui/svg-icons/navigation/apps';
import Drawer from 'material-ui/Drawer';

const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
  large: {
    width: 100,
    height: 100,
  },
};

class BtnCategories extends React.Component {
  state = {
    open: false,
  };

  handleDrawer = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const {open} = this.state;
    return (
        <div>
          <IconButton
              onClick={this.handleDrawer}
              tooltip="Categories" touch={true}
              tooltipPosition="bottom-right"
              iconStyle={styles.largeIcon}
              style={styles.large}>
            <Categories/>
          </IconButton>
          <Drawer onRequestChange={(open) => this.setState({open})}
                  docked={false} width={200}
                  open={open}>
            <h2>Categories</h2>
          </Drawer>
        </div>
    );
  }
}

export default BtnCategories;