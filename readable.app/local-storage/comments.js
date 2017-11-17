import lStorage from './lStorage';
import {defaultComments} from './default-data';
import {incrementCommentCounter} from './posts';

const setData = data => lStorage.setData('comments', data);
const getData = () => lStorage.getData('comments', defaultComments);

export const getCommByParent = parentId => {
  const comments = getData();
  const keys = Object.keys(comments);
  const filtered_keys = keys.filter(
      key => comments[key].parentId === parentId && !comments[key].deleted);

  return filtered_keys.map(key => comments[key]);
};

export const getCommById = id => {
  const comments = getData();

  return comments[id].deleted || comments[id].parentDeleted
      ? {}
      : comments[id];
};

export const addComments = comment => {
  const {id, timestamp, body, author, parentId} = comment;
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

export const voteComments = (id, vote) => {
  const comments = getData();
  const comment = comments[id];

  comment.voteScore = vote
      ? comment.voteScore + 1
      : comment.voteScore - 1;
  setData(comments);

  return comment;
};

export const disableComments = id => {
  const comments = getData();
  const comment = comments[id];
  comment.deleted = true;

  setData(comments);
  incrementCommentCounter(comment.parentId, -1);

  return comment;
};

export const editComments = (id, comment) => {
  const comments = getData();

  for (let prop in comment) {
    comments[id][prop] = comment[prop];
  }
  setData(comments);

  return comments[id];
};