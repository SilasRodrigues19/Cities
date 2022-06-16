import { useRef, useEffect } from 'react';

export const useTitle = (title: string, setNewTitle = false) => {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => () => {
    !setNewTitle ? document.title = defaultTitle.current : setNewTitle;
  }, [])
}