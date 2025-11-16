import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const read = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState(read);

  const set = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, set];
};
