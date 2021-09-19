import { Entry } from "@/types";
import { AritcleColumn, ArticleLink, ArticleList, LatestArticle } from ".";
import { Title } from "../texts";
import { ArticleCard } from "./card";

export const Related: React.FC<{ related: Entry[] }> = ({ related }) => {
  return (
    <ArticleList>
      <Title>RELATED</Title>
      <LatestArticle>
        {related.map((post) => (
          <AritcleColumn key={post.slug} column={3}>
            <ArticleLink href={`/${post.data.category}/${post.slug}`}>
              <ArticleCard entry={post.data} />
            </ArticleLink>
          </AritcleColumn>
        ))}
      </LatestArticle>
    </ArticleList>
  );
};
