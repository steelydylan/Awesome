import Link from "next/link";

const _List: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

const _ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <li className="list-item">
      {children}
      <style jsx>
        {`
          .list-item {
            list-style: none;
            margin: 16px 4px;
          }
          .list-item :global(.active) {
            background-color: var(--c-primary);
            color: #fff;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </li>
  );
};

const _PagerLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  children,
  href,
}) => {
  return (
    <Link href={href} className="link">
      {children}
      <style jsx>
        {`
          :global(.link) {
            color: var(--c-primary);
            border: 1px solid var(--c-primary);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </Link>
  );
};

type Props = {
  max?: number;
  current?: number;
  className?: string;
  append?: string;
};

export const Pager: React.VFC<Props> = (props) => {
  const list: React.ReactNode[] = [];
  const { max, current, className, append = "" } = props;

  if (max && current) {
    for (let i = 1; i <= max; i += 1) {
      if (i === current) {
        list.push(
          <_ListItem key={i}>
            <span className="active">{i}</span>
          </_ListItem>
        );
      } else if (i === 1 && i !== current) {
        list.push(
          <_ListItem key={i}>
            <_PagerLink href={`${append}/`}>
              <span>1</span>
            </_PagerLink>
          </_ListItem>
        );
      } else if (Math.abs(i - current) < 4) {
        list.push(
          <_ListItem key={i}>
            <_PagerLink href={`${append}/page/${i}`}>
              <span>{i}</span>
            </_PagerLink>
          </_ListItem>
        );
      } else if (i === max && i !== current) {
        list.push(
          <_PagerLink href={`${append}/page/${max}`} key={i}>
            <span>{max}</span>
          </_PagerLink>
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
