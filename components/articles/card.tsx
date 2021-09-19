import { ArticleData } from "@/types";
import Image from "next/image";
import blogConfig from "@/blog.config";
import dayjs from "dayjs";

const PublishdAt: React.FC<{ date: string }> = ({ date }) => {
  return (
    <div className="published-at">
      {dayjs(date).format("YYYY.MM.DD")}
      <style jsx>
        {`
          .published-at {
            text-align: right;
            font-size: var(--text-xs);
            color: var(--c-text-gray-lighter);
          }
        `}
      </style>
    </div>
  );
};

type Props = {
  article: ArticleData;
  className?: string;
};

export const ArticleCard: React.VFC<Props> = ({ article, className }) => {
  return (
    <div className={className}>
      <div className="article-img-wrap">
        <Image
          src={article.thumbnail ?? blogConfig.article.defaultThumbnail}
          className="article-img"
          alt=""
          layout="fill"
        />
      </div>
      <div className="article-content">
        {article.category && (
          <div className="category-label-wrap">
            <span className="category-label">{article.category}</span>
          </div>
        )}
        <h2 className="article-title">{article.title}</h2>
        <PublishdAt date={article.date} />
      </div>
      <style jsx>
        {`
          .category-label-wrap {
            display: block;
            margin-bottom: 20px;
          }
          .category-label {
            color: var(--c-primary);
            border: 1px solid var(--c-primary);
            font-size: var(--text-sm);
            border-radius: 10px;
            padding: 3px 10px;
            display: inline-block;
          }
          .article-content {
            padding: 12px 0;
          }
          .article-img-wrap {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 50%;
            border-radius: 20px;
            overflow: hidden;
          }
          .article-img-wrap :global(.article-img) {
            object-fit: cover;
          }
          .article-title {
            font-size: var(--text-md);
          }
        `}
      </style>
    </div>
  );
};
