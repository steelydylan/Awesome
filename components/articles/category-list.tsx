import categories from "@/contents/categories";
import Link from "next/link";
import styled from "styled-components";
import media from "styled-media-query";
import { Container } from "../common/container";
import { SubTitle } from "../texts";

const _Wrapper = styled.div`
  padding: 30px 0;
`;

const _CategoryList = styled.ul<{ column: number }>`
  display: flex;
  flex-wrap: wrap;
  margin-left: 0;
  list-style-type: none;
  padding-left: 0;
  margin: 0 -8px;
  li {
    width: ${({ column }) => `${100 / column}%`};
    padding: 8px;
    ${media.lessThan("small")`
      width: 100%;
    `}
  }
  a {
    display: block;
    padding: 13px 20px;
    box-shadow: 0px 4px 4px rgba(222, 222, 222, 0.25);
  }
  ${media.lessThan("small")`
    display: block;
  `}
`;

type Props = {
  column?: number;
};

export const ArticleCategoryList: React.VFC<Props> = (props) => {
  const { column = 1 } = props;

  return (
    <_Wrapper>
      <Container>
        <SubTitle>CATEGORY</SubTitle>
        <_CategoryList column={column}>
          {categories.map((c) => (
            <li key={c.id}>
              <Link href={c.id}>
                <a href={c.id}>{c.title}</a>
              </Link>
            </li>
          ))}
        </_CategoryList>
      </Container>
    </_Wrapper>
  );
};
