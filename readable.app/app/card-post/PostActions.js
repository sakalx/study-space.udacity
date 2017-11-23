import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {disablePost, votePost} from 'root/app/actions/post';

import {CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionVoteUp from 'material-ui/svg-icons/action/thumb-up';
import ActionVoteDown from 'material-ui/svg-icons/action/thumb-down';

@connect(store => ({posts: store.post}))

class PostActions extends React.Component {

  postId = this.props.postId;
  dispatch = this.props.dispatch;

  handleDisable = () =>
      this.dispatch(disablePost(this.postId));

  handleVotePost = vote =>
      this.dispatch(votePost(this.postId, vote));

  render() {
    const {voteUp, voteDown} = this.props.posts[this.postId];

    return (
        <CardActions>
          <FlatButton label={voteUp} onClick={this.handleVotePost.bind(this, 1)}
                      icon={<ActionVoteUp/>}/>
          <FlatButton label={voteDown} onClick={this.handleVotePost.bind(this, -1)}
                      icon={<ActionVoteDown/>}/>
          <FlatButton label="Edit post" icon={<ActionEdit/>}/>
          <FlatButton label="Delete post" onClick={this.handleDisable}
                      icon={<ActionDelete/>} secondary={true}/>
          <FlatButton label="Read more" primary={true}/>
        </CardActions>
    );
  }
}
PostActions.propTypes = {
  postId: PropTypes.string,
};

export default PostActions;