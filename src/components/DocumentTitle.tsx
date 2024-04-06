import { useEffect } from "react";

const DocumentTitle = (title: string) => {
  return useEffect(() => {
    window.document.title = title;
  }, [title]);
};

export default DocumentTitle;
