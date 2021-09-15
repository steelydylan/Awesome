export default {
  siteLogo: "/images/logo.svg",
  siteName: "AWESOME",
  title: "AWESOME",
  description: "AWESOME Next.js TypeScript MDX Blog Theme",
  styles: {
    containerMaxWidth: "1280px",
    colors: {
      primary: "#50C0A1",
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
  account: {
    name: "Mr. AWESOME",
    description: "profile here profile here profile here profile here",
    image: `/images/me.png`,
    social: {
      twitter: "https://twitter.com/steelydylan",
      github: "https://github.com/steelydylan",
    },
  },
  hero: {
    title: "My awesome travel life",
    image: "/images/plane.jpeg",
    description:
      "description here. description here. description here. description here. description here.",
  },
  navigation: [
    {
      name: "travel",
      url: `/travel`,
    },
    {
      name: "About",
      url: `/about`,
    },
  ],
  article: {
    defaultThumbnail: "/images/thumbnail.png",
    articlesPerPage: 6,
  },
  categories: [
    {
      id: "html-css",
      title: "HTML/CSS",
      imagePath: "/images/london.jpeg",
      description: "About HTML/CSS",
      emoji: "",
    },
    {
      id: "travel",
      title: "Travel",
      imagePath: "/images/london.jpeg",
      description: "Look at my awesome travel life",
      emoji: "",
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
  ],
};
