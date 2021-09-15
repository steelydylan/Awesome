import styled from "styled-components";
import dayjs from "dayjs";
import { getAuthorFromName } from "@/utils/authors";
import { EntryData } from "@/types";
import { TagList } from "./common/tag-list";
import { getTagList } from "./utils/get-tag-list";

const _ContentHeader = styled.header`
  border-bottom: solid 1px var(--c-gray-border);
  padding-bottom: 1rem;
`;

const _Time = styled.time`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 20px;
  display: block;
`;

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
          <img src={data.thumbnail} alt="" className="thumbnail" />
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
          .thumbnail {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}
      </style>
    </header>
  );
};
