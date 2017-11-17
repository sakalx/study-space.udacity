import lStorage from './lStorage';
import {defaultPosts} from './default-data';

const setData = data => lStorage.setData('posts', data);
const getData = () => lStorage.getData('posts', defaultPosts);

export const getAllPost = () => {
  const posts = getData();
  const keys = Object.keys(posts);
  const filtered_keys = keys.filter(key => !posts[key].deleted);

  return filtered_keys.map(key => posts[key]);
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

export const addPost = ({id, timestamp, title, body, author, category}) => {
  const posts = getData();
  const newPosts = {
    ...posts,
    [id]: {
      id,
      timestamp,
      title,
      body,
      author,
      category,
      voteScore: 1,
      deleted: false,
      commentCount: 0,
    },
  };

  setData(newPosts);

  return posts[id];
};

export const votePost = (id, vote) => {
  const posts = getData();
  const post = posts[id];

  post.voteScore = vote
      ? post.voteScore + 1
      : post.voteScore - 1;
  setData(posts);

  return post;
};

export const disablePost = id => {
  const posts = getData();
  const post = posts[id];

  post.deleted = true;
  setData(posts);

  return post;
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
  const post = posts[id];

  post.commentCount += count;
  setData(posts);

  return post;
};