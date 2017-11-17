import React from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';

import ActionVoteUp from 'material-ui/svg-icons/action/thumb-up';
import ActionVoteDown from 'material-ui/svg-icons/action/thumb-down';

export default class CardExampleControlled extends React.Component {

  state = {
    expanded: false,
  };

  handleExpandChange = expanded => {
    this.setState({expanded: expanded});
  };

  render() {
    return (
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
          <CardHeader
              title="Posted by thingtwo"
              subtitle="Tue Jun 28 2016"
              actAsExpander={true}
              showExpandableButton={true}
          />
          <CardText>
            <h1>Post title Udacity is the best place to learn React</h1>
          </CardText>

          <CardTitle subtitle="2 comments" expandable={true}/>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
            pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions>


            <FlatButton label="1222" icon={<ActionVoteUp/>}/>
            <FlatButton label="-22" icon={<ActionVoteDown/>}/>

            <FlatButton label="Edit post" icon={<ActionEdit/>}/>
            <FlatButton label="Delete post" icon={<ActionDelete/>} secondary={true}/>
            <FlatButton label="Read more" primary={true}/>
          </CardActions>
        </Card>
    );
  }
};