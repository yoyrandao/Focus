import { ChromeMessage, MessageType } from './types';

const sendMessage = (type: MessageType): void => {
  const application = chrome || browser;

  application.runtime.sendMessage({
    type: type,
  } as ChromeMessage);
};

export { sendMessage };
