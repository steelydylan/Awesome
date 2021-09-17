import blogConfig from "@/blog.config";
import Link from "next/link";

export const ArticleWrapper: React.FC = ({ children }) => {
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
};

export const LatestArticle: React.FC = ({ children }) => {
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
};

export const ArticleLink: React.FC<{ href: string }> = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="article-link" href={href}>
        {children}
        <style jsx>
          {`
            .article-link {
              display: block;
              width: 100%;
            }
          `}
        </style>
      </a>
    </Link>
  );
};

export const ArticleList: React.FC = ({ children }) => {
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
};

export const AritcleColumn: React.FC<{ column?: number }> = ({
  children,
  column = 3,
}) => {
  return (
    <div className="article-column">
      {children}
      <style jsx>
        {`
          @keyframes articleAppear {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0px);
            }
          }
          .article-column {
            transform: translateY(10px);
            opacity: 0;
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
          .article-column {
            &:nth-child(1) {
              animation: articleAppear 0.3s ease 0.5s 1 forwards;
            }

            &:nth-child(2) {
              animation: articleAppear 0.3s ease 0.6s 1 forwards;
            }

            &:nth-child(3) {
              animation: articleAppear 0.3s ease 0.7s 1 forwards;
            }

            &:nth-child(4) {
              animation: articleAppear 0.3s ease 0.8s 1 forwards;
            }

            &:nth-child(5) {
              animation: articleAppear 0.3s ease 0.9s 1 forwards;
            }

            &:nth-child(6) {
              animation: articleAppear 0.3s ease 1s 1 forwards;
            }
          }
        `}
      </style>
    </div>
  );
};
