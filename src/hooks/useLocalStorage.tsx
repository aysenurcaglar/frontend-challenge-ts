import { useState } from "react";

// Define types for the parameters and return value
type ValueSetter<T> = (newValue: T) => void;
type UseLocalStorageReturn<T> = [T, ValueSetter<T>];

// Define the custom hook with generics for type safety
function useLocalStorage<T>(key: string, defaultValue: T): UseLocalStorageReturn<T> {
  const [value, setValue] = useState<T>(() => {
    const localVal = JSON.parse(localStorage.getItem(key) || "null");
    if (localVal === null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    } else {
      return localVal;
    }
  });

  const setLocalStorage: ValueSetter<T> = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setLocalStorage];
}

export default useLocalStorage;
