import { Category, Tag } from "@/types";
import Link from "next/link";

export const TagList: React.VFC<{ category?: Category; tags: Tag[] }> = ({
  category,
  tags,
}) => {
  return (
    <ul className="taglist">
      {category && (
        <li>
          <Link href={`/${category.id}`}>{category.title}</Link>
        </li>
      )}
      {tags
        .filter((tag) => !!tag?.id)
        .map((tag) => (
          <li key={tag.id}>
            <Link href={`/tags/${tag.id}`}>{tag.title}</Link>
          </li>
        ))}
      <style jsx>
        {`
          .taglist {
            padding-left: 0;
            display: inline-flex;
            flex-wrap: wrap;
            white-space: nowrap;
          }
          .taglist li {
            list-style-type: none;
            display: inline-block;
            padding: 3px 7px;
            margin-right: 18px;
            margin-bottom: 10px;
            border: 1px solid var(--c-primary);
            color: var(--c-primary);
            border-radius: 10px;
            font-size: var(--text-sm);
          }
        `}
      </style>
    </ul>
  );
};
