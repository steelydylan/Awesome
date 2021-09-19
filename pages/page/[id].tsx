import { GetStaticPaths } from "next";
import { NextSeo } from "next-seo";
import { getArticles } from "@/utils/get-articles";
import { Layout } from "@/components/layout";
import { Article } from "@/types";
import {
  ArticleLink,
  ArticleList,
  LatestArticle,
  AritcleColumn,
} from "@/components/articles";
import { ArticleCard } from "@/components/articles/card";
import { Pager } from "@/components/pager";
import blogConfig from "@/blog.config";
import { Side } from "@/components/layouts/side";
import { Wrapper } from "@/components/common/wrapper";
import { Main } from "@/components/layouts/main";

const PageDetail = ({
  articles,
  current,
  max,
}: {
  articles: Article[];
  current: number;
  max: number;
}) => {
  return (
    <Layout>
      <Wrapper>
        <Main>
          <ArticleList>
            <LatestArticle>
              {articles.map((article) => (
                <AritcleColumn key={article.slug} column={2}>
                  <ArticleLink
                    href={`/${article.data.category}/${article.slug}`}
                  >
                    <ArticleCard article={article.data} />
                  </ArticleLink>
                </AritcleColumn>
              ))}
            </LatestArticle>
            <Pager current={current} max={max} />
          </ArticleList>
        </Main>
        <Side />
      </Wrapper>
      <NextSeo canonical={process.env.NEXT_PUBLIC_SITE_URL} />
    </Layout>
  );
};

export default PageDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getArticles();
  const paths = [];
  articles.forEach((article, index) => {
    if ((index + 1) % blogConfig.article.articlesPerPage === 0) {
      paths.push({
        params: {
          id: `${(index + 1) / blogConfig.article.articlesPerPage + 1}`,
        },
      });
    }
  });
  return { paths, fallback: false };
};

export const getStaticProps = ({ params }) => {
  const articles = getArticles();
  const { id } = params;
  const current = parseInt(id, 10) - 1;
  return {
    props: {
      current: current + 1,
      max: Math.ceil(articles.length / blogConfig.article.articlesPerPage),
      articles: articles
        .sort((articleA, articleB) => {
          if (articleA.data.date > articleB.data.date) {
            return -1;
          }
          return 1;
        })
        .slice(
          current * blogConfig.article.articlesPerPage,
          current * blogConfig.article.articlesPerPage +
            blogConfig.article.articlesPerPage
        )
        .map((article) => {
          const { content, ...others } = article;
          return others;
        }),
    },
  };
};
