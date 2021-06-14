import { ChromeMessage, Rule, LocalStorageRulesKey } from '../lib/types';
import { extendUrl, isValidUrl, extractDomainAndName } from '../lib/url';
import { sendMessage } from '../lib/messaging';
import { getStorageItem, setStorageItem } from '../lib/storage';

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
    const data: Rule[] = getStorageItem<Rule[]>(LocalStorageRulesKey) || [];

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
    const data: Rule[] = getStorageItem<Rule[]>(LocalStorageRulesKey) || [];

    application.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (!tab) {
        return;
      }

      if (!isValidUrl(tab.url || '')) {
        return;
      }

      const [domain, name]: string[] = extractDomainAndName(tab.url || '');
      data.push({
        link: domain,
        name: name.toUpperCase(),
      });

      setStorageItem(LocalStorageRulesKey, data);
      registerBlockingRules(data);

      sendMessage('SET_LOCALLY');

      return;
    });
  }
});

application.runtime.onInstalled.addListener(() => {
  console.log('Background worker instantiated.');
});
