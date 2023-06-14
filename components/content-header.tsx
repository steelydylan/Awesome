import dayjs from "dayjs";
import { ArticleData } from "@/types";
import blogConfig from "@/blog.config";
import { TagList } from "./common/tag-list";
import { getTagList } from "./utils/get-tag-list";
import { getCategory } from "./utils/get-category";

export function ContentHeader({ data }: { data?: ArticleData }) {
  const dateFormatted = data.date
    ? dayjs(data.date).format("YYYY-MM-DD")
    : null;
  return (
    <header className="content-header">
      <h1 className="title">{data.title}</h1>
      {data.tags && (
        <TagList
          category={getCategory(data.category)}
          tags={getTagList(data.tags)}
        />
      )}
      {!data.hideThumbnail && (
        <div className="thumbnail-wrap fadein">
          <img
            src={data.thumbnail || blogConfig.article.defaultThumbnail}
            alt="thumbnail"
            className="thumbnail"
          />
        </div>
      )}
      {!data.hideThumbnail && <time className="time">{dateFormatted}</time>}
      <style jsx>
        {`
          .time {
            display: block;
            font-weight: normal;
            font-size: var(--text-sm);
            color: var(--c-text-gray-lighter);
            margin-bottom: 20px;
            display: block;
            text-align: right;
          }
          .content-header {
            border-bottom: solid 1px var(--c-gray-border);
            padding-bottom: 1rem;
          }
          .title {
            font-size: 28px;
            line-height: 1.7;
          }
          .thumbnail-wrap {
            width: 100%;
            padding-bottom: 50%;
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            margin-bottom: 10px;
          }
          .thumbnail {
            object-fit: cover;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
        `}
      </style>
    </header>
  );
}
