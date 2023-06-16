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
import { Category, Article } from "@/types";
import blogConfig from "@/blog.config";
import { CategoryHero } from "@/components/common/category-hero";
import { Wrapper } from "@/components/common/wrapper";
import { LinkButton } from "@/components/buttons";
import { useArticles } from "@/hooks/use-articles";
import { NotFound } from "@/components/common/not-found";

type Props = {
  category: Category;
  articles: Article[];
  max: number;
};

const CategoryIndex: NextPage<Props> = (props) => {
  const { category, articles: defaultArticles, max } = props;

  if (!defaultArticles || defaultArticles.length === 0) {
    return <NotFound />;
  }

  const { articles } = useArticles({
    defaultArticles,
    current: 0,
    categoryId: category.id,
  });

  return (
    <Layout>
      <Wrapper>
        <CategoryHero
          title={category.title}
          image={category.imagePath}
          description={category.description}
        />
      </Wrapper>
      <Title>{blogConfig.categoryPage.title}</Title>
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
          <LinkButton href={`/${category.id}/page/2`}>
            {blogConfig.categoryPage.readMoreLabel}
          </LinkButton>
        )}
      </div>
      <NextSeo
        title={category.title}
        description={category.description}
        openGraph={{
          title: category.title,
          description: category.description,
          type: "article",
        }}
      />
      <style jsx>
        {`
          .link-button-wrap {
            text-align: center;
            margin-top: 30px;
          }
        `}
      </style>
    </Layout>
  );
};

export default CategoryIndex;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogConfig.categories.map(({ id }) => ({
    params: {
      categoryId: id,
    },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { categoryId } = params;
  const category = blogConfig.categories.find((c) => c.id === categoryId);
  const articles = await getArticles();
  const filteredPosts = articles.filter(({ data }) => {
    return data.category === categoryId;
  });

  const slicedPosts = filteredPosts
    .slice(0, blogConfig.article.articlesPerPage)
    .map((p) => {
      const { content, ...others } = p;
      return others;
    })
    .sort((articleA, articleB) => {
      if (articleA.data.date > articleB.data.date) {
        return -1;
      }
      return 1;
    });

  return {
    revalidate: 60,
    props: {
      category,
      max: Math.ceil(filteredPosts.length / blogConfig.article.articlesPerPage),
      articles: slicedPosts,
    },
  };
};
