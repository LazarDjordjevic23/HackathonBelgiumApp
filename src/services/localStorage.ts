export const setLocalStorage = (key: string, value: any) => {
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value));
    return;
  }
  localStorage.setItem(key, value);
};

export const retriveFromLocalStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    if (value && typeof value === 'object') return JSON.parse(value);
    return value;
  } catch (error) {
    return '';
  }
};

export const clearLocalstorage = () => {
  localStorage.clear();
  location.reload();
};
