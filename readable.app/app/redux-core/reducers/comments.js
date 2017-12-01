import actionTypes from '../actions/actionTypes';

function comments(state = {}, action) {
  const {comment} = actionTypes;
  const {type, payload = {}} = action;

  const updateState = {
    ...state,
    [payload.id]: {
      ...payload
    },
  };

  switch (type) {
    case comment.BY_PARENT:
      return {
        ...payload
      };

    case comment.BY_ID:
      return {
        ...state,
        [payload.id]: {
          ...payload
        },
      };

    case comment.ADD:
      return updateState;

    case comment.VOTE:
      return updateState;

    case comment.DISABLE:
      return updateState;

    case comment.EDIT:
      return updateState;
  }
  return state;
}

export default comments;