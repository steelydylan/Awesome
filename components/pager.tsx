import Link from "next/link";

const _List: React.FC = ({ children }) => {
  return (
    <ul className="list">
      {children}
      <style jsx>
        {`
          .list {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            padding: 0;
          }
        `}
      </style>
    </ul>
  );
};

const _ListItem: React.FC<{ active?: boolean }> = ({ children, active }) => {
  return (
    <li className="list-item">
      {children}
      <style jsx>
        {`
          .list-item {
            list-style: none;
            margin: 16px 4px;
          }
          ${active
            ? `
            .list-item span {
              background-color: #000;
              padding: 12px;
            }
          `
            : ""}
        `}
      </style>
    </li>
  );
};

const _PagerLink: React.FC = ({ children }) => {
  return (
    <a className="link">
      {children}
      <style jsx>
        {`
          .link {
            color: var(--c-primary);
            border: 1px solid var(--c-primary);
            padding: 12px;
          }
        `}
      </style>
    </a>
  );
};

type Props = {
  max?: number;
  current?: number;
  className?: string;
};

export const Pager: React.VFC<Props> = (props) => {
  const list: React.ReactNode[] = [];
  const { max, current, className } = props;

  if (max && current) {
    for (let i = 1; i <= max; i += 1) {
      if (i === current) {
        list.push(
          <_ListItem active>
            <span>{i}</span>
          </_ListItem>
        );
      } else if (i === 1 && i !== current) {
        list.push(
          <_ListItem>
            <Link href="/">
              <_PagerLink>
                <span>1</span>
              </_PagerLink>
            </Link>
          </_ListItem>
        );
      } else if (Math.abs(i - current) < 4) {
        list.push(
          <_ListItem>
            <Link href={`/page/${i}`}>
              <_PagerLink>
                <span>{i}</span>
              </_PagerLink>
            </Link>
          </_ListItem>
        );
      } else if (i === max && i !== current) {
        list.push(
          <Link href={`/page/${max}`}>
            <_PagerLink>
              <span>{max}</span>
            </_PagerLink>
          </Link>
        );
      }
    }
  }

  return (
    <div className={className}>
      <_List>{list}</_List>
    </div>
  );
};
