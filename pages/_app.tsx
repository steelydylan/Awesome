import type { AppProps } from "next/app";
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
  useEffect(() => {
    if (!blogConfig.googleAnalyticsCode) {
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
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
