import { Children } from "react";
import Link from "next/link";
import styled from "styled-components";

const List = styled.ol`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`;

const Separator = styled.li`
  margin: 0 8px;
  user-select: none;
`;

export const Breadcrumbs: React.FC = ({ children }) => {
  return (
    <nav aria-label="Breadcrumbs">
      <List>
        {Children.map(children, (child, idx) => (
          <>
            {idx > 0 && <Separator>&gt;</Separator>}
            <li>{child}</li>
          </>
        ))}
      </List>
    </nav>
  );
};

const BreadcrumbLinkItem = styled.a`
  color: var(--link);
  cursor: pointer;
`;

type ItemProps =
  | {
      link?: false;
    }
  | { link: true; href: string };

export const BreadcrumbItem: React.FC<ItemProps> = (props) => {
  return props.link ? (
    <Link href={props.href}>
      <BreadcrumbLinkItem>{props.children}</BreadcrumbLinkItem>
    </Link>
  ) : (
    <div>{props.children}</div>
  );
};
