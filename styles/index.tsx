import blogConfig from "@/blog.config";

export const GlobalStyle = () => {
  return (
    <>
      <style global jsx>
        {`
          :root {
            --text-xs: 12px;
            --text-sm: 14px;
            --text-md: 16px;
            --text-lg: 18px;
            --text-xl: 24px;
            --g-gray: ${blogConfig.styles.colors.bg};
            --c-primary: ${blogConfig.styles.colors.primary};
            --c-base: ${blogConfig.styles.colors.base};
            --c-text: ${blogConfig.styles.colors.text};
            --c-border: ${blogConfig.styles.colors.border};
            --c-text-gray-lighter: ${blogConfig.styles.colors.grayLighter};
            --c-primary-gradient: ${blogConfig.styles.colors.primaryGradient};
            --container-width: ${blogConfig.styles.containerMaxWidth};
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }

          body {
            color: var(--gray0);
            box-sizing: border-box;
            font-family: "Clarkson", Helvetica, sans-serif;
          }

          h1,
          h2,
          h3 {
            margin: 0;
          }

          a {
            text-decoration: none;
            color: inherit;
            cursor: pointer;
          }

          .hljs {
            display: block;
            overflow-x: auto;
            background-color: transparent !important;
          }

          .hljs-comment,
          .hljs-quote {
            color: #b6c6d0;
          }

          .hljs-selector-tag,
          .hljs-selector-class,
          .hljs-subst {
            color: #ff8e8e;
          }

          .hljs-name,
          .hljs-keyword {
            color: #56cdff;
          }

          .hljs-literal,
          .hljs-variable,
          .hljs-template-variable,
          .hljs-tag .hljs-attr,
          .hljs-attribute {
            color: #64b9ff;
          }

          .hljs-string,
          .hljs-doctag,
          .hljs-number {
            color: #ffb461;
          }

          .hljs-number {
            color: #a6e6b5;
          }
          .hljs-title,
          .hljs-section,
          .hljs-selector-id {
            color: #cba9ff;
          }

          .hljs-tag,
          .hljs-meta {
            color: #b594ff;
          }

          .hljs-params {
            color: #ffffcc;
          }

          .hljs-regexp,
          .hljs-link {
            color: #ff8484;
          }

          // 以下どこで使われるか不明
          .hljs-type,
          .hljs-class .hljs-title {
            color: rgb(173, 192, 250);
          }

          .hljs-symbol,
          .hljs-bullet {
            color: #c367d2;
          }

          .hljs-built_in,
          .hljs-builtin-name {
            color: #64b9ff;
          }

          .hljs-deletion {
            background: #fdd;
          }

          .hljs-addition {
            background: #dfd;
          }

          .hljs-emphasis {
            font-style: italic;
          }

          .hljs-strong {
            font-weight: 700;
          }
        `}
      </style>
    </>
  );
};
