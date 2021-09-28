import { useEffect } from "react";
import tocbot from "tocbot";

const addIdsToTitle = () => {
  const entryContainer = document.querySelector(".content");
  if (!entryContainer) {
    return;
  }
  const headings = entryContainer.querySelectorAll(
    "h1, h2, h3, h4, h5, h6, h7"
  );

  [].forEach.call(headings, (heading: HTMLElement, index) => {
    const id = `i-${index}`;
    if (!heading.getAttribute("id")) {
      heading.setAttribute("id", id);
    }
  });
};

const isHeadingsExists = () => {
  const entryContainer = document.querySelector(".content");
  if (!entryContainer) {
    return;
  }
  const headings = entryContainer.querySelectorAll("h1, h2, h3");
  if (headings.length === 0) {
    return false;
  }
  return true;
};

export const Toc = ({ id }: { id: string }) => {
  useEffect(() => {
    addIdsToTitle();
    const item = document.querySelector(".js-toc") as HTMLElement;
    if (!item) {
      return;
    }
    if (!isHeadingsExists()) {
      return;
    }
    item.style.display = "block";
    tocbot.init({
      tocSelector: ".js-toc",
      contentSelector: ".content",
      listClass: "toc-side-list",
    });
    return () => {
      tocbot.destroy();
    };
  }, [id]);

  return (
    <div>
      <div className="js-toc" />
      <style jsx>
        {`
          .js-toc {
            font-size: 13.5px;
            line-height: 1.5;
            padding: 20px;
            background-color: #f0f4f2;
            border-radius: 20px;
            display: none;
            margin-bottom: 20px;
            > :global(ol) {
              &:before {
                position: absolute;
                content: "";
                width: 2px;
                background: var(--c-primary);
                top: 17px;
                bottom: 8px;
                left: 5px;
                border-radius: 0 0 5px 5px;
                opacity: 0.3;
              }
              > :global(li) {
                font-weight: bold;
                &:before {
                  left: 0;
                  top: 4px;
                  width: 12px;
                  height: 12px;
                  background: var(--c-primary);
                  border: 2px solid #fff;
                  content: "";
                }
              }
            }
            :global(ol) {
              position: relative;
              padding: 0;
              list-style: none;
              :global(li) {
                position: relative;
                margin-top: 5px;
                padding-left: 21px;
                &:before {
                  content: "";
                  position: absolute;
                  border-radius: 50%;
                }
              }
              :global(a) {
                color: var(--c-text-gray-lighter);
                position: relative;
                margin: 8px 0;
                transition: none;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                max-height: 3.05em;
              }
              :global(ol) {
                font-weight: normal;
                :global(li) {
                  padding-left: 0;
                  &:before {
                    left: -19px;
                    top: 6px;
                    width: 8px;
                    height: 8px;
                    border: 2px solid #fff;
                    background: var(--c-primary);
                  }
                }
              }
            }
            :global(a.is-active-link) {
              color: #333;
            }
          }

          @keyframes fadeInToc {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};
