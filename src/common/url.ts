const urlPattern = /^\w+\.\w+$/;

const extendUrl = (url: string): string | undefined => {
  if (!urlPattern.test(url)) {
    return;
  }

  return `*://*.${url}/*`;
};

const getDomain = (url: string | undefined): string => {
  if (!url) {
    return '';
  }

  return new URL(url).hostname.replace('www', '');
};

const getName = (url: string | undefined): string => {
  const domain = getDomain(url);

  return domain.substring(0, domain.lastIndexOf('.')).replace('.', ' ');
};

export { extendUrl, getDomain, getName };
