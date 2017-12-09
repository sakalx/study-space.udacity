const actionTypes = {
  post: {
    ALL: 'GET_ALL_POSTS',
    BY_ID: 'GET_POST_BY_ID',
    ADD: 'ADD_POST',
    VOTE: 'VOTE_POST',
    DISABLE: 'DISABLE_POST',
    EDIT: 'EDIT_POST',
  },
  category: {
    ALL: 'GET_ALL_CATEGORIES',
    TOGGLE: 'TOGGLE_CATEGORY',
    ADD: 'ADD_CATEGORY',
    DISABLE: 'DISABLE_CATEGORIES',
    EDIT: 'EDIT_CATEGORIES',
  },
  comment: {
    BY_PARENT: 'GET_COMMENT_BY_PARENT',
    BY_ID: 'GET_COMMENT_BY_ID',
    ADD: 'ADD_COMMENT',
    VOTE: 'VOTE_COMMENT',
    DISABLE: 'DISABLE_COMMENT',
    EDIT: 'EDIT_COMMENT',
  },
  snackInfo: {
    OPEN: 'OPEN_SNACK',
    CLOSE: 'CLOSE_SNACK',
  },
};

export default actionTypes;