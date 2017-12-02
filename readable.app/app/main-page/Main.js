import React from 'react';
import {connect} from 'react-redux';
import {getAllPost} from 'root/app/redux-core/actions/post';

import Header from '../header/Header';
import BtnCategories from './scenes/BtnCategories';
import MenuSort from './scenes/MenuSort';
import BtnAdd from './components/BtnAddPost';
import Post from '../card-post/Post';
import SnackInfo from '../snack-info/SnackInfo';

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
          <BtnCategories/>
          <MenuSort sortBy={this.handleSort}/>
          {
            sorted.map(id =>
            activeCategories.includes(posts[id].category) &&
            !posts[id].deleted &&
            <Post
                key={posts[id].id}
                post={posts[id]}
            />)
          }
          <BtnAdd/>
          <SnackInfo/>
        </div>
    );
  }
}

export default MainPage;