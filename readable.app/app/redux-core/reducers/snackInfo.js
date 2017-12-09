import actionTypes from '../actions/actionTypes';

const initState = {
  open: false,
  message: '',
};

function snackInfo(state = initState, action) {
  const {snackInfo} = actionTypes;
  const {type, payload = {}} = action;

  switch (type) {
    case snackInfo.OPEN:
      return {
        ...state,
        open: true,
        message: payload,
      };
    case snackInfo.CLOSE:
      return {
        ...state,
        open: false,
        message: payload,
      };

  }
  return state;
}

export default snackInfo;

