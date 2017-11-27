import actionTypes from './actionTypes';

const {snackInfo} = actionTypes;

export const openSnack = msg => ({
  type: snackInfo.OPEN,
  payload: msg,
});

export const closeSnack = () => ({
  type: snackInfo.CLOSE,
  payload: '',
});