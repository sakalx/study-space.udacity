import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editComment} from 'root/app/redux-core/actions/comment';
import {openSnack} from 'root/app/redux-core/actions/snackInfo';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const style = {
  width: '100%',
  maxWidth: 'none',
};

@connect(store => ({
  comments: store.comments,
}))

class EditComment extends React.Component {
  dispatch = this.props.dispatch;

  state = {
    required: {
      name: '',
      comment: '',
    },
  };

  validate = ({author = ' ', body = ' '} = {}) => {
    const check = field => field.length ? '' : 'This field is required.';

    this.setState({
      required: {
        name: check(author),
        comment: check(body),
      },
    });
  };

  handleSubmit = () => {
    const {comment: {id}, handleCloset} = this.props;
    const author = document.getElementById('edit-comment__name').value;
    const body = document.getElementById('edit-comment__comment').value;

    this.validate({author, body});

    if (author.length && body.length) {
      this.dispatch(editComment(id, {author, body}));
      this.dispatch(openSnack('Done !'));
      handleCloset();
    }
  };

  handleCloset = () => {
    this.validate();
    this.props.handleCloset();
  };

  renderTextField = (prop, value, option) =>
      <TextField
          id={`edit-comment__${prop}`}
          errorText={this.state.required[prop]}
          defaultValue={value.replace(/[\n\r]/g, ' ')}
          hintText={`Your ${prop}...`}
          floatingLabelText={prop}
          multiLine={option}
          fullWidth={option}
          rowsMax={7}
          rows={option ? Math.ceil(value.length / 100) + 1 : 1}
      />;

  render() {
    const {open, comment: {author, body}} = this.props;

    const actions = [
      <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleCloset}
      />,
      <FlatButton
          label="Submit"
          primary={true}
          onClick={this.handleSubmit}
      />,
    ];

    return (
        <Dialog
            title="Edit Comment"
            actions={actions}
            modal={true}
            contentStyle={style}
            open={open}
        >
          {this.renderTextField('name', author, false)}
          {this.renderTextField('comment', body, true)}
        </Dialog>
    );
  }
}

EditComment.propTypes = {
  handleCloset: PropTypes.func,
  open: PropTypes.bool,
  comment: PropTypes.object,
};

export default EditComment;