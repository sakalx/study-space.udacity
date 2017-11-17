import lStorage from './lStorage';
import {defaultCategories} from './default-data';

const setData = data => lStorage.setData('categories', data);
const getData = () => lStorage.getData('categories', defaultCategories);

export const getAllCategories = () => getData();



