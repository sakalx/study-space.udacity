import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const contentStyle = {
  width: '100%',
  maxWidth: 'none',
};

@connect(store => ({posts: store.posts}))

class EditPost extends React.Component {

  render() {
    console.log(this.props);

    const {edit, handleClose} = this.props;

    const actions = [
      <FlatButton
          label="Cancel"
          primary={true}
          onClick={handleClose}
      />,
      <FlatButton
          label="Submit"
          primary={true}
          onClick={handleClose}
      />,
    ];

    return (
        <div>
          <Dialog
              title="Edit Post"
              contentStyle={contentStyle}
              actions={actions}
              modal={true}
              open={edit}
          >
            <TextField
                hintText="Message Field"
                defaultValue="Default Value"
                floatingLabelText="MultiLine and FloatingLabel"
                multiLine={true}
                rows={2}
                fullWidth={true}
            />
          </Dialog>
        </div>
    );
  }
}

EditPost.propTypes = {
  edit: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default EditPost;