import { Entry } from "@/types";
import Link from "next/link";
import styled from "styled-components";
import { ArticleLink, LatestArticle, AritcleColumn } from ".";
import { Container } from "../common/container";
import { Title } from "../texts";
import { ArticleCard } from "./card";

const _RelatedWrapper = styled.div`
  background-color: #fafafa;
  padding: 25px 0;
`;

type Props = {
  posts: Entry[];
};

export const Related: React.VFC<Props> = ({ posts }) => {
  if (posts.length === 0) {
    return null;
  }
  return (
    <_RelatedWrapper>
      <Container>
        <Title>関連記事</Title>
        <LatestArticle>
          {posts.map((post) => (
            <AritcleColumn key={post.slug} column={3}>
              <Link href={`/articles/${post.slug}`}>
                <ArticleLink>
                  <ArticleCard entry={post.data} />
                </ArticleLink>
              </Link>
            </AritcleColumn>
          ))}
        </LatestArticle>
      </Container>
    </_RelatedWrapper>
  );
};
