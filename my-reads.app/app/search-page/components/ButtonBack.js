import React from 'react';
import {Link} from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
};

const BtnAdd = () =>
    <Link to='/'>
      <IconButton
          tooltip="Back to MyReads" touch={true}
          tooltipPosition="bottom-right"
          iconStyle={styles.largeIcon}
          style={styles.large}>
        <ActionHome/>
      </IconButton>
    </Link>;

export default BtnAdd;
