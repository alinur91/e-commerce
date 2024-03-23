export const getLocalStorageItem = <T>(key: string): T | null => {
  try {
    const dataString = localStorage.getItem(key);
    if (dataString) {
      return JSON.parse(dataString) as T;
    }
    return null;
  } catch (error) {
    console.error("Error while getting data from localStorage:", error);
    return null;
  }
};

export const setLocalStorageItem = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error while saving data to localStorage:", error);
  }
};

export const removeLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error while removing data from localStorage:", error);
  }
};
