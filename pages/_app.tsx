import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import Script from "next/script";
import { GlobalStyle } from "@/styles";
import {
  faFacebook,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import blogConfig from "@/blog.config";

library.add(faTwitter, faFacebook, faGithub);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const canAnalyze =
    blogConfig.googleAnalyticsCode && process.env.NODE_ENV === "production";
  useEffect(() => {
    if (!canAnalyze) {
      return;
    }
    const handleRouteChange = (path: string) => {
      gtag("event", "page_view", {
        page_title: document.title,
        page_location: `${blogConfig.siteUrl}${path}`,
        page_path: path,
        send_to: blogConfig.googleAnalyticsCode,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {canAnalyze && (
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
      <GlobalStyle />
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
