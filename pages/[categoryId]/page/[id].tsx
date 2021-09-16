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
import { getPosts } from "@/utils/get-posts";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Category, Entry } from "@/types";
import blogConfig from "@/blog.config";
import { CategoryHero } from "@/components/common/category-hero";
import { Wrapper } from "@/components/common/wrapper";

type Props = {
  category: Category;
  posts: Entry[];
};

const CategoryDeteil: NextPage<Props> = (props) => {
  const { category, posts } = props;

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
      <ArticleWrapper>
        <LatestArticle>
          {posts.map((post) => (
            <AritcleColumn key={post.slug} column={3}>
              <ArticleLink href={`/${post.data.category}/${post.slug}`}>
                <ArticleCard entry={post.data} />
              </ArticleLink>
            </AritcleColumn>
          ))}
        </LatestArticle>
      </ArticleWrapper>
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
    const posts = getPosts();
    const filteredPosts = posts
      .filter(({ data }) => {
        return data.category === categoryId;
      })
      .map((p) => {
        const { content, ...others } = p;
        return others;
      });

    return {
      props: {
        category,
        posts: filteredPosts,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
