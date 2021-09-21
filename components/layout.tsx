import { library } from "@fortawesome/fontawesome-svg-core";
import { DefaultSeo, NextSeoProps } from "next-seo";
import {
  faTwitter,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import blogConfig from "@/blog.config";

const faviconPath = `${blogConfig.siteUrl}/favicon`;

const nextSeoConfig: NextSeoProps = {
  openGraph: {
    type: "website",
    site_name: blogConfig.siteName,
    title: blogConfig.title,
    images: [
      {
        url: `${blogConfig.siteUrl}/images/ogp.png`,
      },
    ],
  },
  twitter: {
    cardType: "summary_large_image",
  },
  defaultTitle: blogConfig.title,
  titleTemplate: `%s | ${blogConfig.title}`,
  description: blogConfig.description,
  additionalLinkTags: [
    {
      rel: "icon",
      href: `${faviconPath}/favicon.ico`,
    },
    {
      rel: "apple-touch-icon",
      sizes: "57x57",
      href: `${faviconPath}/apple-touch-icon-57x57.png`,
    },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      href: `${faviconPath}/apple-touch-icon-60x60.png`,
    },
    {
      rel: "apple-touch-icon",
      sizes: "72x72",
      href: `${faviconPath}/apple-touch-icon-72x72.png`,
    },
    {
      rel: "apple-touch-icon",
      sizes: "114x114",
      href: `${faviconPath}/apple-touch-icon-114x114.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "36x36",
      href: `${faviconPath}/android-chrome-36x36.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "48x48",
      href: `${faviconPath}/android-chrome-48x48.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "72x72",
      href: `${faviconPath}/android-chrome-72x72.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "36x36",
      href: `${faviconPath}/icon-36x36.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "48x48",
      href: `${faviconPath}/icon-48x48.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "72x72",
      href: `${faviconPath}/icon-72x72.png`,
    },
  ],
};

library.add(faTwitter, faInstagram, faGithub);

export const Layout: React.FC = (props) => {
  return (
    <div>
      <DefaultSeo {...nextSeoConfig} />
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        />
      </Head>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
