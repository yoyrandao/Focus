import { application } from './application';
import { ChromeEvent, MessageType } from './types';

const sendMessage = (type: MessageType): void => {
  application.runtime.sendMessage({
    type: type,
  } as ChromeEvent);
};

export { sendMessage };
