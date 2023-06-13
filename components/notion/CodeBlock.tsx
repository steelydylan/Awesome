import { useLayoutEffect } from "react";

import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import { Text } from "./Text";

hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("js", js);

export function CodeBlock({ text, lang }: { text: any; lang: string }) {
  useLayoutEffect(() => {
    hljs.initHighlighting();
    (hljs.initHighlighting as any).called = false;
  }, []);

  return (
    <pre className="mb-6 md:mb-8 text-sm text-white bg-black p-4 overflow-x-auto rounded-md bg-opacity-80">
      <code className={lang}>
        <Text text={text} />
      </code>
    </pre>
  );
}
