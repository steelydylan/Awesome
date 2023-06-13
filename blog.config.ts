import { BlogConfig } from "./types/config";

const blogConfig: BlogConfig = {
  use: "notion", // mdx or notion
  siteLogo: {
    url: "/images/logo.svg",
    width: 201,
    height: 39,
  },
  siteName: "AWESOME",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  title: "AWESOME",
  description: "AWESOME Next.js TypeScript MDX Blog Theme",
  googleAnalyticsCode: "", // G-**********
  googleAdsenseCode: "", // ca-pub-****************
  notFoundPage: {
    title: "404",
    subtitle: "The page you were looking for was not found.",
    image: "/images/not-found.jpeg",
    description: `The page you were looking for was not found due to reasons such as
    "already deleted" or "URL is different".`,
  },
  topPage: {
    title: "NEW POSTS",
    readMoreLabel: "Read More",
  },
  categoryPage: {
    title: "NEW POSTS",
    readMoreLabel: "Read More",
  },
  articlePage: {
    afterContentAd: "",
  },
  widgets: {
    categoryList: {
      title: "CATEGORY",
    },
    tagList: {
      title: "TAG",
    },
    share: {
      title: "Share",
      socials: ["twitter", "facebook"],
    },
    fixedSidebar: {
      ad: "",
    },
  },
  styles: {
    containerMaxWidth: "1280px",
    colors: {
      primary: "#50C0A1",
      primaryLighter: "#EFF7F3",
      primaryGradient: "linear-gradient(to right, #06A9B7, #B0DE87)",
      base: "#F2F4F3",
      border: "",
      bg: "#F7F7F7",
      text: "#2C2C2C",
      grayLighter: "#A0A0A0",
    },
    breakPoints: {
      huge: "1440px",
      large: "1170px",
      medium: "768px",
      small: "450px",
    },
  },
  hero: {
    title: "My awesome life",
    image: "/images/plane.jpeg",
    description: "AWESOME Next.js TypeScript MDX Blog Theme",
  },
  footer: {
    title: "AWESOME Next.js TypeScript MDX Blog Theme",
  },
  article: {
    defaultThumbnail: "/images/plane.jpeg",
    articlesPerPage: 6,
  },
  navigation: [
    {
      name: "travel",
      url: `/travel`,
    },
    {
      name: "camp",
      url: `/camp`,
    },
  ],
  subNavigation: [
    {
      name: "terms",
      url: "/about/terms",
    },
    {
      name: "privacy",
      url: "/about/privacy",
    },
    {
      name: "GitHub",
      url: "https://github.com/steelydylan/Awesome",
    },
  ],
  account: {
    name: "steelydylan",
    description: "profile here profile here profile here profile here",
    image: `/images/me.jpeg`,
    social: {
      twitter: "https://twitter.com/steelydylan",
      github: "https://github.com/steelydylan",
    },
  },
  writers: [
    {
      id: "awesome",
      name: "Mr. AWESOME",
      description: "profile here profile here profile here profile here",
      image: "/images/me.jpeg",
    },
    {
      id: "steelydylan",
      name: "steelydylan",
      description: "profile here profile here profile here profile here",
      image: "/images/me.jpeg",
    },
  ],
  categories: [
    {
      id: "about",
      title: "About",
      imagePath: "/images/camp.jpeg",
      description: "",
    },
    {
      id: "camp",
      title: "Camp",
      imagePath: "/images/camp.jpeg",
      description: "Look at my awesome camp life",
    },
    {
      id: "travel",
      title: "Travel",
      imagePath: "/images/london.jpeg",
      description: "Look at my awesome travel life",
    },
  ],
  tags: [
    {
      id: "london",
      title: "London",
    },
    {
      id: "boston",
      title: "Boston",
    },
    {
      id: "paris",
      title: "Paris",
    },
    {
      id: "fire",
      title: "Fire",
    },
    {
      id: "sky",
      title: "Sky",
    },
  ],
};

export default blogConfig;
