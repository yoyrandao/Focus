import { ChromeMessage, Rule } from '../common/types';
import { extendUrl, getDomain, getName } from '../common/url';
import { LocalStorageRulesKey } from '../common/types';
import { sendMessage } from '../common/messaging';

const callback = () => {
  return {
    cancel: true,
  };
};

const registerBlockingRules = (rules: Rule[]): void => {
  const rulesLinks = rules
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
};

const application = chrome || browser;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
application.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  message = message as ChromeMessage;

  if (message.type === 'SET_RULES') {
    const data: Rule[] = JSON.parse(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      window.localStorage.getItem(LocalStorageRulesKey)!,
    );

    if (data?.length === 0) {
      console.log(data);
      if (chrome.webRequest.onBeforeRequest.hasListeners()) {
        chrome.webRequest.onBeforeRequest.removeListener(callback);
      }

      return;
    }

    registerBlockingRules(data);
    return;
  }

  if (message.type === 'ADD_CURRENT') {
    const data: Rule[] =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      JSON.parse(window.localStorage.getItem('rules')!) || [];

    application.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      data.push({
        link: getDomain(tab.url),
        name: getName(tab.url).toUpperCase(),
      });

      window.localStorage.setItem(LocalStorageRulesKey, JSON.stringify(data));

      registerBlockingRules(data);
      sendMessage('SET_LOCALLY');

      return;
    });
  }
});

application.runtime.onInstalled.addListener(() => {
  console.log('Background worker instantiated.');
});
