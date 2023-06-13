import blogConfig from "@/blog.config";

export function ArticleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="article-wrapper">
      {children}
      <style jsx>
        {`
          .article-wrapper {
            display: flex;
            justify-content: space-between;
            max-width: var(--container-width);
            width: 95%;
            margin: 0 auto;
            padding: 0;
          }
        `}
      </style>
    </div>
  );
}

export function LatestArticle({ children }: { children: React.ReactNode }) {
  return (
    <div className="latest-article">
      {children}
      <style jsx>
        {`
          .latest-article {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            width: 100%;
          }
        `}
      </style>
    </div>
  );
}

export function ArticleList({ children }: { children: React.ReactNode }) {
  return (
    <div className="article-list">
      {children}
      <style jsx>{`
        .article-list {
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export function AritcleColumn({
  children,
  column = 3,
}: {
  column?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="article-column fadein">
      {children}
      <style jsx>
        {`
          .article-column {
            width: ${column ? `${100 / column}%` : "100%"};
            padding: 15px;
            @media screen and (max-width: ${blogConfig.styles.breakPoints
                .medium}) {
              width: 50%;
            }
            @media screen and (max-width: ${blogConfig.styles.breakPoints
                .small}) {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}
