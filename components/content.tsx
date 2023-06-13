import { useHighlight } from "@/hooks/use-highlight";

export function Content({ content }: { content: string }) {
  const highlightRef = useHighlight();
  return (
    <>
      <article
        className="content"
        ref={highlightRef}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <style jsx>
        {`
          .content {
            padding: 2rem 0;
            line-height: 1.7;

            & > :global(*:first-child) {
              margin-top: 0;
            }

            :global(.embed) {
              margin-bottom: 1.25rem;
              width: 100%;
              height: 140px;
              border: none;
            }

            :global(.quote) {
              display: block;
              padding-left: 1.25rem;
              padding-right: 1.25rem;
              padding-top: 1.25rem;
              padding-bottom: 2.5rem;
              margin-bottom: 1.25rem;
              background-color: #ffffff;
              color: #1f2937;
              width: 100%;
              border-radius: 0.5rem;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -2px rgba(0, 0, 0, 0.05);
            }
            :global(.quote-prepend) {
              color: #6366f1;
              font-size: 1.875rem;
              line-height: 2.25rem;
              line-height: 1.25;
              text-align: left;
              height: 0.75rem;
            }
            :global(.quote-append) {
              margin-top: -0.75rem;
              color: #6366f1;
              font-size: 1.875rem;
              line-height: 2.25rem;
              line-height: 1.25;
              text-align: right;
              height: 0.75rem;
            }
            :global(.quote-inner) {
              padding-left: 1.25rem;
              padding-right: 1.25rem;
              color: #4b5563;
              font-size: 0.875rem;
              line-height: 1.25rem;
              text-align: center;
            }
            :global(.callout) {
              display: flex;
              overflow: hidden;
              padding: 0.5rem;
              margin-bottom: 1.25rem;
              margin-left: 0;
              background-color: #f3f4f6;
              flex-wrap: wrap;
              justify-content: space-between;
              align-items: center;
              border-radius: 0.25rem;

              @media (min-width: 640px) {
                margin-left: 0.5rem;
              }
            }
            :global(.callout-inner) {
              display: flex;
              font-size: 0.875rem;
              line-height: 1.25rem;
              text-align: left;
              flex-direction: column;
              flex-grow: 1;
            }
            :global(i),
            :global(cite),
            :global(em) {
              font-style: italic;
            }
            :global(strong) {
              font-weight: 700;
            }
            :global(a) {
              color: var(--c-primary);
              text-decoration: underline;
              &:hover {
                color: var(--c-primary-hover);
              }
            }
            :global(p + p) {
              margin-top: 1.6rem;
            }
            :global(ul),
            :global(ol) {
              margin: 1.4rem 0;
              line-height: 1.5;
              & > :global(li) {
                margin: 0.6rem 0;
              }
              :global(ul),
              :global(ol) {
                margin: 0.2em 0;
              }
              :global(p) {
                margin: 0;
              }
            }

            :global(ul) {
              padding-left: 0;
              & > :global(li) {
                list-style: none;
                list-style-position: inside;
                position: relative;
                padding-left: 1.5em;

                &:before {
                  content: "";
                  display: block;
                  position: absolute;
                  top: 0.7em;
                  left: 0.3em;
                  width: 7px;
                  height: 7px;
                  border-radius: 50%;
                  background: var(--c-primary);
                }
                li:before {
                  background: var(--c-primary);
                }
              }
            }
            :global(ol) {
              margin-left: 0;
              padding-left: 1.4rem;
              list-style: decimal;
            }

            :global(h1),
            :global(h2),
            :global(h3),
            :global(h4),
            :global(h5),
            :global(h6) {
              & + :global(p) {
                margin-top: 0.3em;
              }
            }

            :global(h1),
            :global(h2) {
              margin-top: 2.3em;
              margin-bottom: 0.5em;
            }
            :global(h3),
            :global(h4),
            :global(h5),
            :global(h6) {
              margin-top: 2.3em;
              margin-bottom: 0.5em;
            }
            :global(h1) {
              padding-bottom: 0.3em;
              margin-bottom: 1.1rem;
              font-size: 1.7em;
              position: relative;
              border-bottom: solid 1px var(--gray2);
            }
            :global(h2) {
              position: relative;
              font-size: 1.7em;
              border-bottom: 2px solid var(--c-primary);
              margin-bottom: 30px;
            }
            :global(h3) {
              font-size: 1.3em;
              margin-bottom: 20px;
            }
            :global(h4) {
              font-size: 1.1em;
            }
            :global(h5) {
              font-size: 1em;
            }
            :global(h5),
            :global(h6) {
              color: var(--gray2);
            }
            :global(h6) {
              font-size: 0.85em;
            }

            :global(hr) {
              border: none;
              border-top: 1px dashed var(--gray2);
              margin: 2rem 0;
            }
            :global(blockquote) {
              margin: 1.4rem 0;
              border-left: solid 3px var(--gray2);
              padding: 0.1rem 0 0.1rem 1.2rem;
              color: var(--gray2);
              :global(p) {
                margin: 1rem 0;
              }
              & > :global(:first-child) {
                margin-top: 0;
              }

              & > :global(:last-child) {
                margin-bottom: 0;
              }
              &:global(.twitter-tweet) {
                display: none;
              }
            }
            :global(table) {
              margin: 1.2rem 0;
              width: auto;
              border-collapse: collapse;
              font-size: 0.95em;
              line-height: 1.7;
            }
            :global(th),
            :global(td) {
              padding: 0.5rem 1vw;
              border: solid 1px var(--gray2);
            }
            :global(th) {
              font-weight: 700;
              background: var(--gray2);
            }
            :global(code) {
              color: var(--c-primary);
              padding: 0.2em 0.4em;
              margin: 0 0.2em;
              background: var(--c-gray);
              vertical-align: middle;
              font-size: 0.95em;
              border-radius: 4px;
            }
            :global(pre) {
              margin: 1.5rem 0;
              background: #1c2131;
              overflow-x: auto;
              border-radius: 3px;
              word-break: normal;
              word-wrap: normal;
              :global(code) {
                margin: 0;
                padding: 0;
                background: transparent;
                font-size: 0.9em;
                color: #fff;
                font-family: Menlo, Monaco, Consolas, Meiryo, "Noto Sans JP",
                  sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                  "Segoe UI Symbol", "Noto Color Emoji";
              }
              & > :global(code) {
                display: block;
                padding: 1rem;
              }
            }
            :global(img) {
              margin: 1.5rem auto;
              display: table;
              box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
              border-radius: 5px;
              max-width: 100%;
              height: auto;
            }
            :global(table) {
              width: 100%;
            }
            :global(th) {
              background-color: var(--c-primary-lighter);
              border: 1px solid #eaf0ed;
            }
            :global(td) {
              border: 1px solid #eaf0ed;
            }
          }
        `}
      </style>
    </>
  );
}
