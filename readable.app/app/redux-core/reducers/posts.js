import actionTypes from '../actions/actionTypes';

function posts(state = {}, action) {
  const {post} = actionTypes;
  const {type, payload = {}} = action;

  const updateState = {
    ...state,
    [payload.id]: {
      ...payload
    },
  };

  switch (type) {
    case post.ALL:
      return {
        ...state,
        ...payload
      };

    case post.BY_ID:
      return {
        ...state,
        [payload.id]: {
          ...payload
        },
      };

    case post.BY_CATEGORIES:
      return {
        ...payload
      };

    case post.ADD:
      return updateState;

    case post.VOTE:
      return updateState;

    case post.DISABLE:
      return updateState;

    case post.EDIT:
      return updateState;
  }
  return state;
}

export default posts;