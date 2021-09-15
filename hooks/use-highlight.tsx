import * as React from "react";
// // todo
import * as hljs from "highlight.js";

export const useHighlight = () => {
  const highlightRef = React.useRef<HTMLElement>();
  React.useEffect(() => {
    if (highlightRef.current) {
      [].forEach.call(
        highlightRef.current.querySelectorAll("pre code"),
        (block) => {
          hljs.highlightBlock(block);
        }
      );
    }
  }, []);
  return highlightRef;
};
