import Image from "next/image";
import dayjs from "dayjs";
import { EntryData } from "@/types";
import { TagList } from "./common/tag-list";
import { getTagList } from "./utils/get-tag-list";

type Props = {
  data: EntryData;
};

export const ContentHeader: React.VFC<Props> = ({ data }) => {
  const dateFormatted = data.date
    ? dayjs(data.date).format("YYYY-MM-DD")
    : null;
  return (
    <header className="content-header">
      <h1 className="title">{data.title}</h1>
      {data.tags && <TagList tags={getTagList(data.tags)} />}
      {data.thumbnail && (
        <div className="thumbnail-wrap">
          <Image
            src={data.thumbnail}
            alt=""
            className="thumbnail"
            layout="fill"
          />
        </div>
      )}
      <time className="time">{dateFormatted}</time>
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
          .thumbnail-wrap :global(.thumbnail) {
            object-fit: cover;
          }
        `}
      </style>
    </header>
  );
};
