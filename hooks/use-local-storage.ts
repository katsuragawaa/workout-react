import { useState, useEffect, useRef, useCallback } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const initialValueRef = useRef(initialValue);

  const getStoredValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValueRef.current;
    } catch (error) {
      console.error(error);
      setError(error as Error);
      return initialValueRef.current;
    }
  }, [key]);

  const setValue: (value: T) => void = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
      setError(error as Error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStoredValue(getStoredValue());
      setInitialized(true);
    }
  }, [getStoredValue]);

  return [storedValue, setValue, initialized, error] as const;
};
