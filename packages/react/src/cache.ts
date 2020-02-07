export const setCache = (src: string) => {
  try {
    sessionStorage.setItem(src, 'y');
  } catch (e) {
    console.error(`Failed to set cache due to ${e}`);
  }
};

export const getCache = (src: string) => sessionStorage.getItem(src);
