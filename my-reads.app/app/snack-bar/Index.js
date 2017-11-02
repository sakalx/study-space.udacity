import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from 'material-ui/Snackbar';

const SnackBar = props => {
  const {open, message} = props;

  return (
      <Snackbar open={open}
                message={message}
                autoHideDuration={2000}/>
  );
};

SnackBar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
};

export default SnackBar;