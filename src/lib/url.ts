const urlPattern = /^\w+\.\w+$/;

const extendUrl = (url: string): string | undefined => {
  if (!urlPattern.test(url)) {
    return;
  }

  return `*://*.${url}/*`;
};

// FIX!!!!!!

const getDomain = (url: string | undefined): string => {
  if (!url) {
    return '';
  }

  return new URL(url).hostname.replace('www.', '');
};

const getName = (url: string | undefined): string => {
  if (!url) {
    return '';
  }

  return url
    .replace('www.', '')
    .substring(0, url.lastIndexOf('.'))
    .replace('.', ' ');
};

export { extendUrl, getDomain, getName };
