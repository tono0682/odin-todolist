const LocalStorage = (() => {
    const saveData = (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
    };
  
    const getData = (key) => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    };
  
    return {
      saveData,
      getData,
    };
  })();
  
  export default LocalStorage;
  