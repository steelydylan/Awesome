import Link from "next/link";

type TopicItem = {
  label: string;
  link?: string;
};

type Props = {
  items: TopicItem[];
};

export const TopicPath: React.VFC<Props> = ({ items }) => {
  return (
    <ul className="topic-path">
      <li>
        <Link href="/">
          <span>Home</span>
        </Link>
      </li>
      {items.map((item) => (
        <li key={item.label}>
          {item.link && (
            <Link href={item.link} key={item.link}>
              <span>{item.label}</span>
            </Link>
          )}
          {!item.link && <span>{item.label}</span>}
        </li>
      ))}
      <style jsx>
        {`
          .topic-path {
            display: inline-flex;
            flex-wrap: wrap;
            padding-left: 0;
            margin-bottom: 20px;
          }
          .topic-path li {
            display: inline-block;
            position: relative;
            margin: 0 15px;
            color: var(--c-text-gray-lighter);
          }
          .topic-path li:after {
            position: absolute;
            right: -20px;
            top: 0;
            content: url(/images/arrow.svg);
            width: 8px;
            height: 10px;
            display: inline-block;
            vertical-align: middle;
            margin-top: -3px;
          }
          .topic-path li:last-child:after {
            display: none;
          }
          .topic-path li:first-child {
            margin-left: 0;
          }
          .topic-path :global(a) {
            color: var(--link);
          }
        `}
      </style>
    </ul>
  );
};
