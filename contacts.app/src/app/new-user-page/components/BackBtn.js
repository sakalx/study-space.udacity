import React from 'react';
import {Link} from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

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

const BackBtn = () =>
    <Link to='/'>
      <IconButton
          tooltip="Back to Contacts" touch={true}
          tooltipPosition="bottom-right"
          iconStyle={styles.largeIcon}
          style={styles.large}>
        <ArrowBack/>
      </IconButton>
    </Link>;

export default BackBtn;
