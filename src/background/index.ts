import { ChromeMessage } from '../common/types';

const callback = () => {
  return {
    cancel: true,
  };
};

const applicaton = chrome || browser;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
applicaton.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  console.log((request as ChromeMessage).type);

  const data = window.localStorage.getItem('rules');
  console.log(data);

  return;

  if (request.type === 'SET_RULES') {
    if (request.data.rules.length === 0) {
      if (chrome.webRequest.onBeforeRequest.hasListeners()) {
        chrome.webRequest.onBeforeRequest.removeListener(callback);
      }

      return;
    }

    chrome.webRequest.onBeforeRequest.addListener(
      callback,
      {
        urls: request.data.rules,
      },
      ['blocking'],
    );
  }
});

applicaton.runtime.onInstalled.addListener(() => {
  console.log('Background worker instantiated.');
});
