import { NextSeo } from "next-seo";
import { Layout } from "@/components/layout";
import {
  ArticleWrapper,
  LatestArticle,
  ArticleLink,
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

type Props = {
  category: Category;
  articles: Article[];
  max: number;
};

const CategoryIndex: NextPage<Props> = (props) => {
  const { category, articles, max } = props;

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
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { categoryId } = params;
  const category = blogConfig.categories.find((c) => c.id === categoryId);
  try {
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
      props: {
        category,
        max: Math.ceil(
          filteredPosts.length / blogConfig.article.articlesPerPage
        ),
        articles: slicedPosts,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
