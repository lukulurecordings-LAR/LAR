import { useEffect } from 'react';

type DocumentTitleProps = {
  title: string;
};

export function DocumentTitle({ title }: DocumentTitleProps) {
  useEffect(() => {
    document.title = `${title} | Lukulu Academy & Recordings`;
  }, [title]);

  return null;
}
