const actionTypes = {
  post: {
    ALL: 'GET_ALL_POSTS',
    ADD: 'ADD_POST',
    VOTE: 'VOTE_POST',
    DISABLE: 'DISABLE_POST',
    EDIT: 'EDIT_POST',
  },
  category: {
    ALL: 'GET_ALL_CATEGORIES',
    TOGGLE: 'TOGGLE_CATEGORY',
  },
  snackInfo: {
    OPEN: 'OPEN_SNACK',
    CLOSE: 'CLOSE_SNACK',
  },
};

export default actionTypes;