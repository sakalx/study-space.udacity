import React from 'react';
import {connect} from 'react-redux';
import {closeSnack} from 'root/app/redux-core/actions/snackInfo';

import Snackbar from 'material-ui/Snackbar';

@connect(store => ({
  snackInfo: store.snackInfo,
}))

class SnackInfo extends React.Component {
  dispatch = this.props.dispatch;

  render() {
    const {message, open} = this.props.snackInfo;

    return (
        <div>
          <Snackbar
              open={open}
              message={message}
              autoHideDuration={3000}
              onRequestClose={() => this.dispatch(closeSnack())}
          />
        </div>
    );
  }
}

export default SnackInfo;