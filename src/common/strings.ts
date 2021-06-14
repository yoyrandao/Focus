const urlPattern = /^\w+\.\w+$/;

const extendUrl = (url: string): string | undefined => {
  if (!urlPattern.test(url)) {
    return;
  }

  return `*://*.${url}/*`;
};

export { extendUrl, urlPattern };
