import Link from "next/link";
import styled, { css } from "styled-components";

const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 0;
`;

const ListItem = styled.li<{ active?: boolean }>`
  list-style: none;
  margin: 16px 4px;
  ${({ active }) =>
    active &&
    css`
      span {
        background-color: #000;
        padding: 12px;
      }
    `}
`;

const PagerLink = styled.a`
  background-color: var(--gray1);
  padding: 12px;
`;

type Props = {
  max?: number;
  current?: number;
  className?: string;
};

export const Pager: React.VFC<Props> = (props) => {
  const lis: React.ReactNode[] = [];
  const { max, current, className } = props;

  if (max && current) {
    for (let i = 1; i <= max; i += 1) {
      if (i === current) {
        lis.push(
          <ListItem active>
            <span>{i}</span>
          </ListItem>
        );
      } else if (i === 1 && i !== current) {
        lis.push(
          <ListItem>
            <Link href="/">
              <PagerLink>
                <span>1</span>
              </PagerLink>
            </Link>
          </ListItem>
        );
      } else if (Math.abs(i - current) < 4) {
        lis.push(
          <ListItem>
            <Link href={`/page/${i}`}>
              <PagerLink>
                <span>{i}</span>
              </PagerLink>
            </Link>
          </ListItem>
        );
      } else if (i === max && i !== current) {
        lis.push(
          <Link href={`/page/${max}`}>
            <PagerLink>
              <span>{max}</span>
            </PagerLink>
          </Link>
        );
      }
    }
  }

  return (
    <div className={className}>
      <List>{lis}</List>
    </div>
  );
};
