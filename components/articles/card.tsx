import { EntryData } from "@/types";
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
  entry: EntryData;
  className?: string;
};

export const ArticleCard: React.VFC<Props> = ({ entry, className }) => {
  return (
    <div className={className}>
      <div className="article-img-wrap">
        <img
          src={entry.thumbnail ?? blogConfig.article.defaultThumbnail}
          className="article-img"
          alt=""
        />
      </div>
      <div className="article-content">
        {entry.category && (
          <div className="category-label-wrap">
            <span className="category-label">{entry.category}</span>
          </div>
        )}
        <h2 className="article-title">{entry.title}</h2>
        <PublishdAt date={entry.date} />
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
          .article-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
          }
          .article-title {
            font-size: var(--text-md);
          }
        `}
      </style>
    </div>
  );
};
