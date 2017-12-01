import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import VoteAction from '../client-actions/vote/VoteAction';
import DeleteEditAction from '../client-actions/delete-edit/DeleteEditAction';

const Actions = styled(CardActions)`
  display: flex;
`;

class CardComment extends React.Component {
  state = {
    expanded: false,
  };

  handleExpandChange = expanded => this.setState({expanded: expanded});

  render() {
    if (this.props.comment.id) {
      const {expanded} = this.state;
      const {id, author, timestamp, body} = this.props.comment;
      const dateComm = new Date(timestamp);
      const date = `${dateComm.getUTCMonth()} / ${dateComm.getUTCDate()} / ${dateComm.getFullYear()} `;

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
                {checkLength ? `${body.slice(0, 200)}...` : body}
              </CardText>
            }
            <Actions>
              <VoteAction id={id} type='comments'/>
              <DeleteEditAction id={id} type='comments'/>
            </Actions>
          </Card>
      );
    }
    return <h1>Rendering333</h1>;
  }
}

CardComment.propTypes = {
  comment: PropTypes.object,
};

export default CardComment;