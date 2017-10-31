// Keeping data in local Storage instead server
export const getStorage = () => {
  let data = localStorage.data;
  if (!data)
    data = localStorage.setItem('data', JSON.stringify([
      {
        'id': 'uniqueID:)',
        'name': 'Fang Yuan 🤤',
        'email': 'yuan2015@mail.ru',
        'img': 'https://sakals.000webhostapp.com/share/HelloKitty5.png',
      },
      {
        'id': 'uniqueID1:)',
        'name': 'Gao Fushuai 😋',
        'email': 'gao.fush91@gmai.com',
        'img': 'https://sakals.000webhostapp.com/share/HelloKitty2.png',
      },
      {
        'id': 'uniqueID2:)',
        'name': 'Fan Mimi 😁',
        'email': 'mimitwo@hotmail.com',
        'img': 'https://sakals.000webhostapp.com/share/HelloKitty3.png',
      },
    ]));
  return JSON.parse(localStorage.getItem('data'));
};

export const remove = id => {
  const newData = getStorage().filter(contact => contact.id !== id);
  localStorage.setItem('data', JSON.stringify(newData));
  return newData;
};

export const create = obj => {
  obj.id = +new Date();
  const newData = getStorage();
  newData.push(obj);
  localStorage.setItem('data', JSON.stringify(newData));
};

