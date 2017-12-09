import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import VoteAction from '../../client-actions/vote/VoteAction';
import DeleteEditAction from '../../client-actions/delete-edit/DeleteEditAction';
import EditComment from './scenes/EditComment';

const Actions = styled(CardActions)`
  display: flex;
  justify-content: center;
  transform: scale(0.7);
`;

class CardComment extends React.Component {
  state = {
    expanded: false,
    editWindowOpen: false,
  };

  handleExpandChange = expanded => this.setState({expanded: expanded});

  handleEditComment = () => {
    this.setState({editWindowOpen: !this.state.editWindowOpen});
  };

  render() {
    if (this.props.comment.id) {
      const {expanded, editWindowOpen} = this.state;
      const {id, author, timestamp, body} = this.props.comment;
      const dateComm = new Date(timestamp);
      const date = `${dateComm.getUTCMonth() +
      1} / ${dateComm.getUTCDate()} / ${dateComm.getFullYear()} `;

      const checkLength = body.length > 100;

      return (
          <Card expanded={expanded} onExpandChange={this.handleExpandChange}>
            <CardHeader
                title={`Author: ${author}`}
                subtitle={date}
                actAsExpander={checkLength}
                showExpandableButton={checkLength}
            />
            {
              expanded
                  ? <CardText> {body} </CardText>
                  : <CardText>
                {checkLength ? `${body.slice(0, 100)}...` : body}
              </CardText>
            }
            <Actions>
              <VoteAction id={id} type='comments'/>
              <DeleteEditAction id={id}
                                type='comments'
                                handleEdit={this.handleEditComment}
              />
            </Actions>
            <EditComment handleCloset={this.handleEditComment}
                         open={editWindowOpen}
                         comment={this.props.comment}
            />
          </Card>
      );
    }
    return <h1>Rendering Comments</h1>;
  }
}

CardComment.propTypes = {
  comment: PropTypes.object,
};

export default CardComment;