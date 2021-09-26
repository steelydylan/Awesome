import blogConfig from "@/blog.config";
import Script from "next/script";
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document<{
  styleTags: JSX.Element;
}> {
  render() {
    return (
      <Html>
        <Head>
          {blogConfig.googleAnalyticsCode && (
            <>
              <Script
                defer
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${blogConfig.googleAnalyticsCode}`}
              />
              <Script defer strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${blogConfig.googleAnalyticsCode}');
                `}
              </Script>
            </>
          )}
          {blogConfig.googleAdsenseCode && (
            <>
              <Script
                strategy="afterInteractive"
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${blogConfig.googleAdsenseCode}"
              crossOrigin="anonymous`}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
