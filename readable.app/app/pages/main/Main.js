import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {getAllPost, getPostByCategories} from 'root/app/redux-core/actions/post';
import {getAllCategory} from 'root/app/redux-core/actions/category';

import Header from '../../header/Header';
import CategoriesDrawer from '../../drawer/CategoriesDrawer';
import MenuSort from './scenes/MenuSort';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Post from '../../cards/post/Post';
import SnackInfo from '../../snack-info/SnackInfo';
import NotFound from 'root/app/pages/404/NotFound';

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

  componentDidMount = () => {
    const {loadCategories} = this.props.match.params;

    const postByCategories = () => {
      const {categories} = this.props;
      const categoriesKey = Object.keys(categories);
      const categoriesId = loadCategories.split(',');

      categoriesId.every(id => !categoriesKey.includes(id))
          ? this.setState({category404: true})
          : this.dispatch(getPostByCategories(categoriesId));
    };

    loadCategories
        ? setTimeout(postByCategories, 0)
        : this.dispatch(getAllPost());

    this.dispatch(getAllCategory());
  };

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

    const sorting = increase => (a, b) => {
      const postA = posts[a][field];
      const postB = posts[b][field];

      return increase ? postA < postB : postA > postB;
    };

    const sorted = postsKey.sort(sorting(increase));

    if (this.state.category404) {
      return <NotFound title={'Page'}/>;
    }

    return (
        <div>
          <Header title='Readable'/>
          <CategoriesDrawer/>
          <MenuSort sortBy={this.handleSort}/>
          {sorted.map(id => {
            const post = posts[id];

            if (!post.deleted && categories[post.category] &&
                !categories[post.category].deleted) {
              return <Post key={id}
                           post={posts[id]}
              />;
            }
          })
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