import { useState } from 'react';

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (_v: T, _f?: (_a: T) => void) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
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

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      completeFunc?.(valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export { useLocalStorage };
