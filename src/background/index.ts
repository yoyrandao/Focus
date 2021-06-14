import { Rule } from '../common/types';
import { extendUrl } from '../common/strings';

const callback = () => {
  return {
    cancel: true,
  };
};

const applicaton = chrome || browser;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
applicaton.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  if (request.type === 'SET_RULES') {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data: Rule[] = JSON.parse(window.localStorage.getItem('rules')!);

    if (data?.length === 0) {
      console.log(data);
      if (chrome.webRequest.onBeforeRequest.hasListeners()) {
        chrome.webRequest.onBeforeRequest.removeListener(callback);
      }

      return;
    }

    const rulesLinks = data
      .map((x) => extendUrl(x.link))
      .filter((x) => x !== undefined)
      .map((x) => x as string);

    chrome.webRequest.onBeforeRequest.addListener(
      callback,
      {
        urls: rulesLinks,
      },
      ['blocking'],
    );
  }
});

applicaton.runtime.onInstalled.addListener(() => {
  console.log('Background worker instantiated.');
});
