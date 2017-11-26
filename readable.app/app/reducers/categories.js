import actionTypes from '../actions/actionTypes';

function category(state = {}, action) {
  const {category} = actionTypes;
  const {type, payload = {}} = action;

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

  }
  return state;
}

export default category;

