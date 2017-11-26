import * as lStorage from 'root/local-storage/categories';
import actionTypes from './actionTypes';

const {category} = actionTypes;

export const getAllCategory = () => ({
  type: category.ALL,
  payload: lStorage.getAllCategories(),
});

export const toggleCategory = id => ({
  type: category.TOGGLE,
  payload: id,
});