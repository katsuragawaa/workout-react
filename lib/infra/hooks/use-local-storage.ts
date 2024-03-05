import { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T | void | undefined) => {
  const [storedValue, setStoredValue] = useState(() => {
    return initialValue;
  });

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item && JSON.parse(item));
    } catch (err) {
      console.error(err);
    }
  }, [key]);

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
