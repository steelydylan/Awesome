import { Article } from "@/types";
import { AritcleColumn, ArticleLink, ArticleList, LatestArticle } from ".";
import { Title } from "../texts";
import { ArticleCard } from "./card";

export const Related: React.FC<{ related: Article[] }> = ({ related }) => {
  return (
    <ArticleList>
      <Title>RELATED</Title>
      <LatestArticle>
        {related.map((post) => (
          <AritcleColumn key={post.slug} column={3}>
            <ArticleCard
              article={post.data}
              href={`/${post.data.category}/${post.slug}`}
            />
          </AritcleColumn>
        ))}
      </LatestArticle>
    </ArticleList>
  );
};
