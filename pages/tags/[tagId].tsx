import { NextSeo } from "next-seo";
import { Layout } from "@/components/layout";
import {
  ArticleWrapper,
  LatestArticle,
  AritcleColumn,
} from "@/components/articles";
import { ArticleCard } from "@/components/articles/card";
import { Title } from "@/components/texts";
import { getArticles } from "@/utils/get-articles";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Article, Tag } from "@/types";
import blogConfig from "@/blog.config";
import { LinkButton } from "@/components/buttons";
import { useArticles } from "@/hooks/use-articles";
import { NotFound } from "@/components/common/not-found";

type Props = {
  tag: Tag;
  articles: Article[];
  max: number;
};

const TagIndex: NextPage<Props> = (props) => {
  const { tag, articles: defaultArticles, max } = props;

  if (!defaultArticles || defaultArticles.length === 0) {
    return <NotFound />;
  }

  const { articles } = useArticles({
    defaultArticles,
    current: 0,
    tagId: tag.id,
  });

  return (
    <Layout>
      <div className="tag">
        <Title>{tag.title}</Title>
      </div>
      <ArticleWrapper>
        <LatestArticle>
          {articles.map((article) => (
            <AritcleColumn key={article.slug} column={3}>
              <ArticleCard
                article={article.data}
                href={`/${article.data.category}/${article.slug}`}
              />
            </AritcleColumn>
          ))}
        </LatestArticle>
      </ArticleWrapper>
      <div className="link-button-wrap">
        {max > 1 && (
          <LinkButton href={`/tags/${tag.id}/page/2`}>Read More</LinkButton>
        )}
      </div>
      <NextSeo
        title={tag.title}
        description={`${blogConfig.siteName} - About ${tag.title}`}
        openGraph={{
          title: tag.title,
          description: `${blogConfig.siteName} - About ${tag.title}`,
          type: "article",
        }}
      />
      <style jsx>
        {`
          .link-button-wrap {
            text-align: center;
            margin-top: 30px;
          }
          .tag {
            margin-top: 50px;
          }
        `}
      </style>
    </Layout>
  );
};

export default TagIndex;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogConfig.tags.map(({ id }) => ({
    params: {
      tagId: id,
    },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { tagId } = params;
  const tag = blogConfig.tags.find((c) => c.id === tagId);
  const articles = await getArticles();
  const filteredPosts = articles.filter(({ data }) => {
    return data.tags.some((t) => t === tag.id);
  });

  const slicedPosts = filteredPosts
    .slice(0, blogConfig.article.articlesPerPage)
    .map((p) => {
      const { content, ...others } = p;
      return others;
    });

  return {
    revalidate: 60,
    props: {
      tag,
      max: Math.ceil(filteredPosts.length / blogConfig.article.articlesPerPage),
      articles: slicedPosts,
    },
  };
};
