const getLocalStorage = (key: string) => {
  return new Promise((resolve) => {
    if (chrome.storage) {
      chrome.storage.local.get([key], (result) => {
        resolve(result[key]);
      });
    }
  });
};

const setLocalStorage = (key: string, value: any) => {
  return new Promise((resolve) => {
    if (chrome.storage) {
      chrome.storage.local.set({ [key]: value }, () => {
        resolve(null);
      });
    }
  });
};

const resetLocalStorage = () => {
  return new Promise((resolve) => {
    if (chrome.storage) {
      chrome.storage.local.clear(() => {
        resolve(null);
      });
    }
  });
};

export const useGoogleStorage = () => {
  return { getLocalStorage, setLocalStorage, resetLocalStorage };
};
