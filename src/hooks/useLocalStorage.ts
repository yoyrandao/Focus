import { useState } from 'react';
import { getStorageItem, setStorageItem } from '../lib/storage';

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (_v: T, _f?: (_a: T) => void) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      return getStorageItem(key) || initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T, completeFunc?: (arg: T) => void) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      setStorageItem(key, valueToStore);

      completeFunc?.(valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export { useLocalStorage };
