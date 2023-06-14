import { ArticleData } from "@/types";
import blogConfig from "@/blog.config";
import dayjs from "dayjs";
import Link from "next/link";
import { TagList } from "../common/tag-list";
import { getTagList } from "../utils/get-tag-list";
import { getCategory } from "../utils/get-category";

function PublishdAt({ date }: { date: string }) {
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
}

type Props = {
  article: ArticleData;
  href: string;
  className?: string;
};

export function ArticleCard({ article, className, href }: Props) {
  return (
    <div className={className}>
      <div className="article-img-wrap">
        <Link href={href}>
          <img
            src={article.thumbnail ?? blogConfig.article.defaultThumbnail}
            className="article-img"
            alt=""
            loading="lazy"
          />
        </Link>
      </div>
      <div className="article-content">
        <TagList
          tags={getTagList(article.tags)}
          category={getCategory(article.category)}
        />
        <h2 className="article-title">
          <Link href={href}>{article.title}</Link>
        </h2>
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
          .article-img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
          .article-title {
            font-size: var(--text-md);
            line-height: 1.7;
          }
        `}
      </style>
    </div>
  );
}
