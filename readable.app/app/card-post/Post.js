import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import VoteAction from '../client-actions/vote/VoteAction';
import DeleteEditAction from '../client-actions/delete-edit/DeleteEditAction';

const Actions = styled(CardActions)`
  display: flex;
`;

class CardPost extends React.Component {
  state = {
    expanded: false,
  };

  handleExpandChange = expanded => this.setState({expanded: expanded});

  render() {
    const {expanded} = this.state;
    const {id, author, timestamp, title, commentCount, body} = this.props.post;
    const datePost = new Date(timestamp);
    const date = `${datePost.getUTCMonth() +
    1} / ${datePost.getUTCDate()} / ${datePost.getFullYear()} `;

    return (
        <Card expanded={expanded} onExpandChange={this.handleExpandChange}>
          <CardHeader
              title={`Posted by ${author}`}
              subtitle={date}
              actAsExpander={true}
              showExpandableButton={true}
          />
          <CardText>
            <h1>{title}</h1>
          </CardText>
          <CardTitle expandable={true}
                     subtitle={`${commentCount} comments`}
          />
          <CardText expandable={true}>
            {
              body.length < 200 ? body : `${body.slice(0, 200)}...`
            }
          </CardText>
          <Actions>
            <VoteAction id={id} type='posts'/>
            <DeleteEditAction id={id} type='posts'/>
            <Link to={`read-more/${id}`}>
              <FlatButton label="Read more"
                          primary={true}
              />
            </Link>
          </Actions>
        </Card>
    );
  }
}

CardPost.propTypes = {
  post: PropTypes.object,
};

export default CardPost;