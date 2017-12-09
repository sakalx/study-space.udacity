import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {getAllPost} from 'root/app/redux-core/actions/post';

import Header from '../../header/Header';
import CategoriesDrawer from '../../drawer/CategoriesDrawer';
import MenuSort from './scenes/MenuSort';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Post from '../../cards/post/Post';
import SnackInfo from '../../snack-info/SnackInfo';

const ButtonAdd = styled(FloatingActionButton)`
  position: fixed;
  bottom: 25px;
  right: 25px;
`;

@connect(store => ({
  posts: store.posts,
  categories: store.categories,
}))

class MainPage extends React.Component {
  dispatch = this.props.dispatch;

  state = {
    sortBy: {
      field: 'voteUp',
      increase: true,
    },
  };

  componentDidMount = () => this.dispatch(getAllPost());

  handleSort = (field, increase = true) => {
    this.setState({
      sortBy: {
        field,
        increase,
      },
    });
  };

  render() {
    const {field, increase} = this.state.sortBy;
    const {posts, categories} = this.props;
    const postsKey = Object.keys(posts);
    const categoriesKey = Object.keys(categories);

    const activeCategories = categoriesKey.filter(id =>
        categories[id].active,
    );

    const sorting = increase => (a, b) => {
      const postA = posts[a][field];
      const postB = posts[b][field];

      return increase ? postA < postB : postA > postB;
    };

    const sorted = postsKey.sort(sorting(increase));

    return (
        <div>
          <Header title='Readable'/>
          <CategoriesDrawer/>
          <MenuSort sortBy={this.handleSort}/>
          {
            sorted.map(id =>
            activeCategories.includes(posts[id].category) &&
            !posts[id].deleted &&
            <Post
                key={id}
                post={posts[id]}
            />)
          }
          <Link to='/update-post'>
            <ButtonAdd>
              <ContentAdd/>
            </ButtonAdd>
          </Link>
          <SnackInfo/>
        </div>
    );
  }
}

export default MainPage;