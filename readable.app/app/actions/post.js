import * as lStorage from 'root/local-storage/posts';
import actionTypes from './actionTypes';

const {post} = actionTypes;

export const getAllPost = () => ({
  type: post.ALL,
  payload: lStorage.getAllPost(),
});

export const addPost = objPost => ({
  type: post.ADD,
  payload: lStorage.addPost(objPost),
});

export const votePost = (id, vote) => ({
  type: post.VOTE,
  payload: lStorage.votePost(id, vote),
});

export const disablePost = id => ({
  type: post.DISABLE,
  payload: lStorage.disablePost(id),
});

export const editPost = (id, post) => ({
  type: post.EDIT,
  payload: lStorage.editPost(id, post),
});


