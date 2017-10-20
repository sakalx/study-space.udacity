import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from 'material-ui/Snackbar';

const SnackBar = props =>
    <Snackbar open={props.open}
              message={props.message}
              autoHideDuration={2000}/>;

SnackBar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
};

export default SnackBar;