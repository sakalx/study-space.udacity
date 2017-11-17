const lStorage = {
  setData(prop, data) {
    localStorage.setItem(prop, JSON.stringify(data));
  },

  getData(prop, data)  {
    const getProp = localStorage[prop];

    if (!getProp) {
      this.setData(prop, data);
    }

    return JSON.parse(localStorage.getItem(prop));
  },
};

export default lStorage;