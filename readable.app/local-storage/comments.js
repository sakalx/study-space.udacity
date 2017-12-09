import lStorage from './lStorage';
import {defaultComments} from './default-data';
import {incrementCommentCounter} from './posts';

const setData = data => lStorage.setData('comments', data);
const getData = () => lStorage.getData('comments', defaultComments);

export const getCommByParent = parentId => {
  const comments = getData();
  let existingComments = {};

  for (let key in comments) {
    if (comments[key].parentId === parentId && !comments[key].deleted) {
      existingComments[comments[key].id] = comments[key];
    }
  }

  return existingComments;
};

export const getCommById = id => {
  const comments = getData();

  return comments[id].deleted || comments[id].parentDeleted
      ? {}
      : comments[id];
};

export const addComment = ({
                             id = (+new Date()).toString(36),
                             timestamp = +new Date(),
                             author = null,
                             body = null,
                             parentId = null,
                           }) => {
  const comments = getData();

  comments[id] = {
    id,
    timestamp,
    body,
    author,
    parentId,
    voteUp: 0,
    voteDown: 0,
    deleted: false,
    parentDeleted: false,
  };
  incrementCommentCounter(parentId, 1);
  setData(comments);

  return comments[id];
};

export const voteComment = (id, vote) => {
  const comments = getData();
  const comment = comments[id];

  vote > 0 && (comment.voteUp += vote);
  vote < 0 && (comment.voteDown += vote);
  setData(comments);

  return comments[id];
};

export const disableComment = id => {
  const comments = getData();

  comments[id].deleted = true;
  setData(comments);
  incrementCommentCounter(comments[id].parentId, -1);

  return comments[id];
};

export const editComment = (id, comment) => {
  const comments = getData();

  for (let prop in comment) {
    comments[id][prop] = comment[prop];
  }
  setData(comments);

  return comments[id];
};