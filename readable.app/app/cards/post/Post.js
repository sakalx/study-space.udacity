import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Link, withRouter} from 'react-router-dom';
import muiTheme from 'root/theme';

import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import VoteAction from '../../client-actions/vote/VoteAction';
import DeleteEditAction from '../../client-actions/delete-edit/DeleteEditAction';

const Actions = styled(CardActions)`
  display: flex;
`;

class CardPost extends React.Component {
  state = {
    expanded: false,
  };

  handleEditPost = () => this.props.history.push(`/update-post/${this.props.post.id}`);

  render() {
    const {expanded} = this.state;
    const {id, author, timestamp, title, commentCount, body, category} = this.props.post;
    const datePost = new Date(timestamp);

    const date = `${datePost.getUTCMonth() +
    1} / ${datePost.getUTCDate()} / ${datePost.getFullYear()} `;
    const {palette} = muiTheme;

    return (
        <Card expanded={expanded}
              onExpandChange={(expanded) => this.setState({expanded: expanded})}>
          <CardHeader
              title={`Posted by ${author}`}
              subtitle={date}
              showExpandableButton={true}
          />
          <CardText actAsExpander={true}>
            <h1 style={{color: palette.primary1Color}}>{title}</h1>
          </CardText>
          <CardTitle expandable={true}
                     subtitle={`${commentCount} comments`}
          />
          <CardText expandable={true}
                    style={{color: palette.primary2Color}}
          >
            {
              body.length < 200 ? body : `${body.slice(0, 200)}...`
            }
          </CardText>
          <Actions expandable={true}>
            <VoteAction id={id}
                        type='posts'
            />
            <DeleteEditAction id={id}
                              type='posts'
                              handleEdit={this.handleEditPost}
            />
            <Link to={`/${category}/${id}`}>
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

export default withRouter(CardPost);