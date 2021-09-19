import type { AppProps } from "next/app";
import { GlobalStyle } from "@/styles";
import {
  faFacebook,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Head from "next/head";
import blogConfig from "@/blog.config";

library.add(faTwitter, faFacebook, faGithub);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {blogConfig.googleAnalyticsCode && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${blogConfig.googleAnalyticsCode}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${blogConfig.googleAnalyticsCode}');`,
              }}
            />
          </>
        )}
        {blogConfig.googleAdsenseCode && (
          <>
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${blogConfig.googleAdsenseCode}"
              crossOrigin="anonymous`}
            />
          </>
        )}
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
