import actionTypes from '../actions/actionTypes';

function post(state = {}, action) {
  const {post} = actionTypes;
  const {type, payload = {}} = action;

  const upDateState = {
    ...state,
    [payload.id]: {
      ...payload
    },
  };

  switch (type) {
    case post.ALL:
      return {...payload};

    case post.ADD:
      return upDateState;

    case post.VOTE:
      return upDateState;

    case post.DISABLE:
      return upDateState;

    case post.EDIT:
      return upDateState;
  }
  return state;
}

export default post;

