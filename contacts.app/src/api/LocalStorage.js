// Keeping data in local Storage instead server
export const lStorage = () => {
  let data = localStorage.data;
  if (!data)
    data = localStorage.setItem('data', JSON.stringify(
        [
          {
            'id': 'ryan',
            'name': 'Ryan Florence',
            'email': 'ryan@reacttraining.com',
            'avatarURL': 'http://localhost:5001/ryan.jpg',
          },
          {
            'id': 'michael',
            'name': 'Michael Jackson',
            'email': 'michael@reacttraining.com',
            'avatarURL': 'http://localhost:5001/michael.jpg',
          },
          {
            'id': 'tyler',
            'name': 'Tyler McGinnis',
            'email': 'tyler@reacttraining.com',
            'avatarURL': 'http://localhost:5001/tyler.jpg',
          },
        ],
    ));
  return JSON.parse(localStorage.getItem('data'));
};

export const remove = id => {
  const newData = lStorage().filter(contact => contact.id !== id);
  localStorage.setItem('data', JSON.stringify(newData));
  return newData;
};

export const create = obj => {
  const newData = lStorage();
  newData.push(obj);
  localStorage.setItem('data', JSON.stringify(newData));
};

