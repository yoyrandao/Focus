import { sendMessage } from '../lib/messaging';

export const useEvents = (): {
  setRules: () => void;
  setLocally: () => void;
  addCurrent: () => void;
} => {
  return {
    setRules: () => sendMessage('set-rules'),
    setLocally: () => sendMessage('set-locally'),
    addCurrent: () => sendMessage('add-current'),
  };
};
