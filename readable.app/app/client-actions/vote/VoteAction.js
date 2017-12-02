import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {votePost} from 'root/app/redux-core/actions/post';
import {voteComment} from 'root/app/redux-core/actions/comment';
import {openSnack} from 'root/app/redux-core/actions/snackInfo';

import FlatButton from 'material-ui/FlatButton';
import ActionVoteUp from 'material-ui/svg-icons/action/thumb-up';
import ActionVoteDown from 'material-ui/svg-icons/action/thumb-down';

@connect(store => ({
  posts: store.posts,
  comments: store.comments,
  snackInfo: store.snackInfo,
}))

class VoteAction extends React.Component {
  dispatch = this.props.dispatch;

  id = this.props.id;
  type = this.props.type;

  handleVote = vote => {
    switch (this.type) {
      case 'posts':
        this.dispatch(votePost(this.id, vote));
        break;
      case 'comments':
        this.dispatch(voteComment(this.id, vote));
        break;
    }

    this.dispatch(openSnack(
        `${vote > 0 ? 'Like Added' : 'Unlike Added'}`,
    ));
  };

  render() {
    const {voteUp, voteDown} = this.props[this.type][this.id];

    return (
        <div>
          <FlatButton label={voteUp}
                      onClick={() => this.handleVote(1)}
                      icon={<ActionVoteUp/>}
          />
          <FlatButton label={voteDown}
                      onClick={() => this.handleVote(-1)}
                      icon={<ActionVoteDown/>}
          />
        </div>
    );
  }
}

VoteAction.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
};

export default VoteAction;