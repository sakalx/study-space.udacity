import React from 'react';

import {CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionVoteUp from 'material-ui/svg-icons/action/thumb-up';
import ActionVoteDown from 'material-ui/svg-icons/action/thumb-down';

class PostActions extends React.Component {

  render() {
    return (
        <CardActions>
          <FlatButton label="1222" icon={<ActionVoteUp/>}/>
          <FlatButton label="-22" icon={<ActionVoteDown/>}/>
          <FlatButton label="Edit post" icon={<ActionEdit/>}/>
          <FlatButton label="Delete post" icon={<ActionDelete/>} secondary={true}/>
          <FlatButton label="Read more" primary={true}/>
        </CardActions>
    );
  }
}

export default PostActions;