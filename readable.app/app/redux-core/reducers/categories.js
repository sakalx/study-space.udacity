import actionTypes from '../actions/actionTypes';

function category(state = {}, action) {
  const {category} = actionTypes;
  const {type, payload = {}} = action;

  const updateState = {
    ...state,
    [payload.id]: {
      ...payload
    },
  };

  switch (type) {
    case category.ALL:
      return {
        ...state,
        ...payload,
      };
    case category.TOGGLE:
      return {
        ...state,
        [payload]: {
          ...state[payload],
          active: !state[payload].active,
        },
      };
    case category.ADD:
      return updateState;

    case category.EDIT:
      return {
        ...state,
        ...payload,
      };

    case category.DISABLE:
      return {
        ...state,
        ...payload,
      };
  }
  return state;
}

export default category;

