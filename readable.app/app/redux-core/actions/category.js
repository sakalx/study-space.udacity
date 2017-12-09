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

export const addCategory = name => ({
  type: category.ADD,
  payload: lStorage.addCategory(name),
});

export const disableCategories = id => ({
  type: category.DISABLE,
  payload: lStorage.disableCategories(id),
});

export const editCategories = editedCategories => ({
  type: category.EDIT,
  payload: lStorage.editCategories(editedCategories),
});