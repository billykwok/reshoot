export const setCache = (src: string): void => {
  try {
    sessionStorage.setItem(src, 'y');
  } catch (e) {
    console.error(e);
  }
};

export const getCache = (src: string): string => sessionStorage.getItem(src);
