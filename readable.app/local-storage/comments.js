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

export const addComment = comment => {
  const {id, timestamp = +new Date(), body, author, parentId} = comment;
  const comments = getData();
  const newComments = {
    ...comments,
    [id]: {
      id,
      timestamp,
      body,
      author,
      parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false,
    },
  };

  incrementCommentCounter(parentId, 1);
  setData(newComments);

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
  const comment = comments[id];
  comment.deleted = true;

  setData(comments);
  incrementCommentCounter(comment.parentId, -1);

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