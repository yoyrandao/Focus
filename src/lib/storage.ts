const getStorageItem = <T>(key: string): T | undefined => {
  if (!window.localStorage) {
    return;
  }

  const storageValue = window.localStorage.getItem(key);
  if (!storageValue) {
    return;
  }

  return JSON.parse(storageValue) as T;
};

const setStorageItem = (key: string, value: unknown): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export { getStorageItem, setStorageItem };
