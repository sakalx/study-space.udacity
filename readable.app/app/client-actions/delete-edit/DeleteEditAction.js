import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {disablePost} from 'root/app/redux-core/actions/post';
import {disableComment} from 'root/app/redux-core/actions/comment';
import {openSnack} from 'root/app/redux-core/actions/snackInfo';

import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';

@connect(store => ({
  posts: store.posts,
  comments: store.posts,
  snackInfo: store.snackInfo,
}))

class DeleteEditAction extends React.Component {
  dispatch = this.props.dispatch;

  id = this.props.id;
  type = this.props.type;

  handleDisable = () => {
    switch (this.type) {
      case 'posts':
        this.dispatch(disablePost(this.id));
        break;
      case 'comments':
        this.dispatch(disableComment(this.id));
        break;
    }
    this.dispatch(openSnack('Removed Successful'));
  };

  render() {
    const {handleEdit} = this.props;

    return (
        <div>
          <FlatButton label="Delete"
                      onClick={this.handleDisable}
                      icon={<ActionDelete/>}
                      secondary={true}
          />
          <FlatButton label="Edit"
                      onClick={() => handleEdit()}
                      icon={<ActionEdit/>}
          />
        </div>
    );
  }
}

DeleteEditAction.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  handleEdit: PropTypes.func,
};

export default DeleteEditAction;