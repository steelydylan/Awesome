import { NextSeo } from "next-seo";
import { Layout } from "@/components/layout";
import {
  ArticleWrapper,
  LatestArticle,
  ArticleLink,
  AritcleColumn,
  ArticleList,
} from "@/components/articles";
import { ArticleCard } from "@/components/articles/card";
import { Title } from "@/components/texts";
import { getPosts } from "@/utils/get-posts";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Category, Entry } from "@/types";
import blogConfig from "@/blog.config";
import { CategoryHero } from "@/components/common/category-hero";
import { Wrapper } from "@/components/common/wrapper";
import { Pager } from "@/components/pager";

type Props = {
  category: Category;
  posts: Entry[];
  current: number;
  max: number;
};

const CategoryDeteil: NextPage<Props> = (props) => {
  const { category, posts, current, max } = props;

  return (
    <Layout>
      <Wrapper>
        <CategoryHero
          title={category.title}
          image={category.imagePath}
          description={category.description}
        />
      </Wrapper>
      <Title>POSTS</Title>
      <Wrapper>
        <ArticleList>
          <LatestArticle>
            {posts.map((post) => (
              <AritcleColumn key={post.slug} column={3}>
                <ArticleLink href={`/${post.data.category}/${post.slug}`}>
                  <ArticleCard entry={post.data} />
                </ArticleLink>
              </AritcleColumn>
            ))}
          </LatestArticle>
          <Pager current={current} max={max} append={`/${category.id}`} />
        </ArticleList>
      </Wrapper>
      <NextSeo
        title={category.title}
        description={category.description}
        openGraph={{
          title: category.title,
          description: category.description,
          type: "article",
        }}
      />
    </Layout>
  );
};

export default CategoryDeteil;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getPosts();
  const paths = [];
  const map = new Map<string, number>();
  posts.forEach((post, index) => {
    const catNum = map.get(post.data.category)
      ? map.get(post.data.category) + 1
      : 1;
    map.set(post.data.category, catNum);
    if (catNum % blogConfig.article.articlesPerPage === 0) {
      paths.push({
        params: {
          id: `${catNum / blogConfig.article.articlesPerPage + 1}`,
          categoryId: post.data.category,
        },
      });
    }
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { categoryId, id } = params;
  const category = blogConfig.categories.find((c) => c.id === categoryId);
  const current = parseInt(id as string, 10) - 1;
  try {
    const posts = getPosts();
    const filteredPosts = posts
      .filter(({ data }) => {
        return data.category === categoryId;
      })
      .sort((postA, postB) => {
        if (postA.data.date > postB.data.date) {
          return -1;
        }
        return 1;
      });

    const slicedPosts = filteredPosts
      .slice(
        current * blogConfig.article.articlesPerPage,
        current * blogConfig.article.articlesPerPage +
          blogConfig.article.articlesPerPage
      )
      .map((p) => {
        const { content, ...others } = p;
        return others;
      });

    return {
      props: {
        current: current + 1,
        max: Math.ceil(
          filteredPosts.length / blogConfig.article.articlesPerPage
        ),
        category,
        posts: slicedPosts,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
