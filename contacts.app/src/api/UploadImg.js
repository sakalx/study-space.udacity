export const validateSize = fileInput => { //Проверка добавленного файла на размер
  return new Promise((resolve, reject) => {

    const fileObj = (typeof ActiveXObject === 'function')
        ? // IE
        (new ActiveXObject('Scripting.FileSystemObject')).getFile(fileInput.value)
        : fileInput;

    const size = fileObj.size; //Размер в байтах

    if (size > 52428) { // 50Kb
      reject(alert('Image size is too large (maximum 50 kB)'));
    } else {
      resolve(fileInput);
    }

  });
};

export const readImage = fileInput => { //Загрузка изображения
  if (fileInput && fileInput.type.match(/^image\//)) {
    return new Promise(resolve => {
      const FR = new FileReader();
      FR.onload = e => {
        localStorage.setItem('img', e.target.result);  //Добавление кода base64 в LocalStorage
        resolve(e.target.result);
      };
      FR.readAsDataURL(fileInput);
    });
  }
};