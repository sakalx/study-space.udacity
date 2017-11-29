import React from 'react';
import {Link} from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

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

const LinkToHome = () =>
    <Link to='/'>
      <IconButton
          tooltip="Back to Home Page" touch={true}
          tooltipPosition="bottom-right"
          iconStyle={styles.largeIcon}
          style={styles.large}>
        <ActionHome/>
      </IconButton>
    </Link>;

export default LinkToHome;
