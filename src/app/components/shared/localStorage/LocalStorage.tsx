export const setLocalStorage = (key: string, data: string): void => {
    if (key && data) {
      localStorage.setItem(key, data);
    }
  };
  
  export const getLocalStorage = (key: string): string | null => {
    return localStorage.getItem(key);
  };
  
  export const emptyLocalStorage = (): void => {
    localStorage.clear();
  };
  
  export const removeLocalStorage = (key: string): void => {
    if (key) {
      localStorage.removeItem(key);
    }
  };
  