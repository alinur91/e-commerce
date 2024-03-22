import { useState } from "react";

// Define a generic type for the value stored in localStorage
type LocalStorageValue<T> = T | null;

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [LocalStorageValue<T>, (value: T) => void, () => void] => {
  // Retrieve the item from localStorage, or use the initialValue if not found
  const [storedValue, setStoredValue] = useState<LocalStorageValue<T>>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error retrieving value from localStorage:", error);
      return initialValue;
    }
  });

  // Update the stored value in localStorage and state
  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting value in localStorage:", error);
    }
  };

  // Remove the item from localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error("Error removing value from localStorage:", error);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
