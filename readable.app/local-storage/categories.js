import lStorage from './lStorage';
import {defaultCategories} from './default-data';

const setData = data => lStorage.setData('categories', data);
const getData = () => lStorage.getData('categories', defaultCategories);

export const getAllCategories = () => {
  const categories = getData();
  let existingCategories = {};

  for (let key in categories) {
    if (!categories[key].deleted) {
      existingCategories[categories[key].id] = categories[key];
    }
  }
  return existingCategories;
};

export const addCategory = (
    name = null,
    id = (+new Date()).toString(36),) => {
  const categories = getData();

  categories[id] = {
    id,
    name,
    active: false,
    deleted: false,
  };
  setData(categories);

  return categories[id];
};

export const disableCategories = ids => {
  const categories = getData();

  ids.forEach(id => {
    categories[id].deleted = true;
    categories[id].active = false;
  });
  setData(categories);

  return categories;
};

export const editCategories = editedObj => {
  const categories = getData();

  for (let id in editedObj) {
    if (editedObj[id]) {
      categories[id].name = editedObj[id];
    } else {
      categories[id].deleted = true;
      categories[id].active = false;
    }
  }
  setData(categories);

  return categories;
};

