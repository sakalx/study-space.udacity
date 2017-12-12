import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import {getPostById} from 'root/app/redux-core/actions/post';
import {getCommByParent} from 'root/app/redux-core/actions/comment';

import Subheader from 'material-ui/Subheader';
import Header from '../../header/Header';
import LinkToHome from '../../links/LinkToHome';
import VoteAction from '../../client-actions/vote/VoteAction';
import DeleteEditAction from '../../client-actions/delete-edit/DeleteEditAction';
import Paper from 'material-ui/Paper';
import CardComment from '../../cards/comment/Comment';
import NewComment from './scenes/NewComment';
import SnackInfo from '../../snack-info/SnackInfo';
import NotFound from 'root/app/pages/404/NotFound';

const BackToHome = styled.div`
  position: absolute;
  top: 0px;
`;
const Author = styled.h3`
  color: #fff;
`;
const Comments = styled(Paper)`
  text-align: center;
  color: #757575 !important;
`;
const Actions = styled.div`
  display: flex;
`;

@connect(store => ({
  posts: store.posts,
  comments: store.comments,
}))

class ReadMore extends React.Component {
  dispatch = this.props.dispatch;
  id = this.props.match.params.id;

  componentDidMount = () => {
    this.dispatch(getPostById(this.id));
    this.dispatch(getCommByParent(this.id));
  };

  handleEditPost = () => this.props.history.push(`/update-post/${this.id}`);

  render() {
    const {posts} = this.props;

    if (!posts[this.id] || posts[this.id].deleted) {
      return <NotFound title={'Post'}/>;
    }

    const {id, title, body, timestamp, author} = this.props.posts[this.id];
    const {comments} = this.props;
    const commentsKey = Object.keys(comments);

    const sorted = commentsKey.sort((a, b) =>
        comments[a].timestamp > comments[b].timestamp,
    );

    return (
        <div>
          <Header title={title}/>
          <BackToHome>
            <LinkToHome/>
          </BackToHome>
          <Author>Author: {author}</Author>
          <p style={{whiteSpace: 'pre-line'}}>{body}</p>
          <Subheader>
            {String(new Date(timestamp))}
          </Subheader>
          <Actions expandable={true}>
            <VoteAction id={id} type='posts'/>
            <DeleteEditAction id={id}
                              type='posts'
                              handleEdit={this.handleEditPost}
            />
          </Actions>
          {
            !!sorted[0] &&
            <Comments zDepth={3}>
              <h2>COMMENTS</h2>
            </Comments>
          }
          {
            sorted.map(id =>
                !comments[id].deleted &&
                <CardComment
                    key={comments[id].id}
                    comment={comments[id]}
                />,
            )
          }
          <br/>
          <NewComment parentId={this.id}/>
          <br/>
          <SnackInfo/>
        </div>
    );
  }
}

export default withRouter(ReadMore);