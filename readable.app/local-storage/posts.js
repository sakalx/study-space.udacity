import lStorage from './lStorage';
import {defaultPosts} from './default-data';

const setData = data => lStorage.setData('posts', data);
const getData = () => lStorage.getData('posts', defaultPosts);

export const getAllPost = () => {
  const posts = getData();
  let existingPosts = {};

  for (let key in posts) {
    if (!posts[key].deleted) {
      existingPosts[posts[key].id] = posts[key];
    }
  }

  return existingPosts;
};

export const getPostByCategory = category => {
  const posts = getData();
  const keys = Object.keys(posts);
  const filtered_keys = keys.filter(
      key => posts[key].category === category && !posts[key].deleted);

  return filtered_keys.map(key => posts[key]);
};

export const getPostById = id => {
  const posts = getData();

  return posts[id].deleted ? {} : posts[id];
};

export const addPost = ({
                          id = (+new Date()).toString(36),
                          timestamp = +new Date(),
                          title = null,
                          body = null,
                          author = null,
                          category = null,
                        }) => {
  const posts = getData();

  posts[id] = {
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteUp: 0,
    voteDown: 0,
    deleted: false,
    commentCount: 0,
  };
  setData(posts);

  return posts[id];
};

export const votePost = (id, vote) => {
  const posts = getData();
  const post = posts[id];

  vote > 0 && (post.voteUp += vote);
  vote < 0 && (post.voteDown += vote);

  setData(posts);

  return posts[id];
};

export const disablePost = id => {
  const posts = getData();

  posts[id].deleted = true;
  setData(posts);

  return posts[id];
};

export const editPost = (id, post) => {
  const posts = getData();

  for (let prop in post) {
    posts[id][prop] = post[prop];
  }
  setData(posts);

  return posts[id];
};

export const incrementCommentCounter = (id, count) => {
  const posts = getData();

  posts[id].commentCount += count;
  setData(posts);
};