import { renderToString } from "react-dom/server";
import { GetStaticProps, GetStaticPaths } from "next";
import { NextSeo, ArticleJsonLd, ArticleJsonLdProps } from "next-seo";
import { getPosts } from "@/utils/get-posts";
import { Entry } from "@/types";
import { Content } from "@/components/content";
import { ContentHeader } from "@/components/content-header";
import { Layout } from "@/components/layout";
import { TopicPath } from "@/components/common/topicpath";
import { Side } from "@/components/layouts/side";
import { Wrapper } from "@/components/common/wrapper";
import blogConfig from "@/blog.config";
import { Main } from "@/components/layouts/main";

type DetailProps = {
  entry: Entry;
  // errorCode?: number;
  related: Entry[];
};

export default ({ entry, related }: DetailProps) => {
  const jsonLd: ArticleJsonLdProps = {
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: entry.data.title,
    images: [entry.data.thumbnail],
    datePublished: entry.data.date,
    description: entry.data.description ?? entry.excerpt,
    authorName: "",
    publisherName: "",
    publisherLogo: "",
  };
  // if (errorCode) {
  //   return <ErrorComponent statusCode={errorCode} />;
  // }

  return (
    <Layout>
      {entry && (
        <>
          <Wrapper>
            {entry.data && (
              <Main>
                <TopicPath items={[{ label: entry.data.title }]} />
                <ContentHeader data={entry.data} />
                <Content content={entry.content} />

                {/* <Related posts={related} /> */}
              </Main>
            )}
            <Side />
          </Wrapper>
        </>
      )}
      <NextSeo
        title={entry.data.title}
        description={entry.data.description ?? entry.excerpt}
        openGraph={{
          title: entry.data.title,
          description: entry.excerpt,
          type: "article",
          images: [
            {
              url: entry.data.thumbnail,
            },
          ],
        }}
      />
      <ArticleJsonLd {...jsonLd} />
      <style jsx>
        {`
          .article-banner {
            width: 100%;
            height: auto;
            margin-bottom: 40px;
            display: block;
          }
        `}
      </style>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getPosts();
  const paths = posts.map((post) => {
    return {
      params: {
        id: post.slug,
        categoryId: post.data.category,
        slug: post.slug,
      },
    };
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug, categoryId } = params;
  try {
    const post = await import(`@/contents/${slug}/index.mdx`);
    const category = blogConfig.categories.find((cat) => cat.id === categoryId);
    const { default: Default, ...data } = post;
    const posts = getPosts();
    const { related } = data;

    return {
      props: {
        entry: {
          content: renderToString(<Default />),
          data,
        },
        related: related
          ? posts.filter((p) => {
              return related.some((r) => r === p.slug);
            })
          : [],
        category,
      },
    };
  } catch (e) {
    return {
      props: {
        content: "Not Found",
        data: {},
        errorCode: 404,
      },
    };
  }
};
