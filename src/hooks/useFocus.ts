import React, { useEffect, useRef } from 'react';

const useFocus = <T extends HTMLElement>(
  initialValue: T | null,
): React.RefObject<T> => {
  const reference = useRef<T>(initialValue);

  useEffect(() => {
    reference?.current?.focus();
  }, []);

  return reference;
};

export { useFocus };
