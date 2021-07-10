import { application } from '../lib/application';
import { sendMessage } from '../lib/messaging';

import { getStorageItem, setStorageItem } from '../lib/storage';
import { extendUrl, isValidUrl, extractDomainAndName } from '../lib/url';

import { ChromeEvent, Rule } from '../lib/types';
import { LocalStorageRulesKey } from '../lib/keys';

/*
 * Helpful functions
 */

const listenerAction = () => {
  // change to redirect to custom page
  return {
    cancel: true,
  };
};

/*
 * Additional functions
 */

const registerBlockingRules = (rules: Rule[]): void => {
  const rulesLinks = rules
    .map((x) => extendUrl(x.link))
    .filter((x) => x !== undefined)
    .map((x) => x as string);

  chrome.webRequest.onBeforeRequest.addListener(
    listenerAction,
    {
      urls: rulesLinks,
    },
    ['blocking'],
  );
};

const handleSettingRules = (): void => {
  const data: Rule[] = getStorageItem<Rule[]>(LocalStorageRulesKey) || [];

  if (data?.length === 0) {
    if (chrome.webRequest.onBeforeRequest.hasListeners()) {
      chrome.webRequest.onBeforeRequest.removeListener(listenerAction);
    }

    return;
  }

  registerBlockingRules(data);
};

const handleAddingCurrent = () => {
  const data: Rule[] = getStorageItem<Rule[]>(LocalStorageRulesKey) || [];

  application.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab) {
      return;
    }

    if (!isValidUrl(tab.url || '')) {
      return;
    }

    const [domain, name]: string[] = extractDomainAndName(tab.url!);
    data.push({
      link: domain,
      name: name.toUpperCase(),
    });

    setStorageItem(LocalStorageRulesKey, data);
    registerBlockingRules(data);

    sendMessage('set-locally');

    return;
  });
};

/*
 * Application Event Handling
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
application.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  const event = message as ChromeEvent;

  if (!event) return;

  switch (event.type) {
    case 'set-rules':
      handleSettingRules();
      break;

    case 'add-current':
      handleAddingCurrent();
      break;

    default:
      return;
  }
});

application.runtime.onInstalled.addListener(() => {
  console.log('Background worker instantiated.');
});

application.runtime.onStartup.addListener(() => {
  handleSettingRules();
});
