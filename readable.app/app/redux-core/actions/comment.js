import * as lStorage from 'root/local-storage/comments';
import actionTypes from './actionTypes';

const {comment} = actionTypes;

export const getCommByParent = id => ({
  type: comment.BY_PARENT,
  payload: lStorage.getCommByParent(id),
});

export const getCommById = id => ({
  type: comment.BY_ID,
  payload: lStorage.getCommById(id),
});

export const addComment = objComm => ({
  type: comment.ADD,
  payload: lStorage.addComment(objComm),
});

export const voteComment = (id, vote) => ({
  type: comment.VOTE,
  payload: lStorage.voteComment(id, vote),
});

export const disableComment = id => ({
  type: comment.DISABLE,
  payload: lStorage.disableComment(id),
});

export const editComment = (id, editedPost) => ({
  type: comment.EDIT,
  payload: lStorage.editComment(id, editedPost),
});