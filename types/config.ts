interface Social {
  twitter?: string;
  github?: string;
  facebook?: string;
}

interface Account {
  name: string;
  description: string;
  image: string;
  social?: Social;
  id?: string;
}

interface Article {
  defaultThumbnail: string;
  articlesPerPage: number;
}

interface Category {
  id: string;
  title: string;
  imagePath: string;
  description: string;
}

interface Page {
  title: string;
  readMoreLabel: string;
}

interface Hero {
  title: string;
  image: string;
  description: string;
  subtitle?: string;
}

interface Navigation {
  name: string;
  url: string;
}

interface SiteLogo {
  url: string;
  width: string;
  height: string;
}

interface BreakPoints {
  huge: string;
  large: string;
  medium: string;
  small: string;
}

interface Colors {
  primary: string;
  primaryLighter: string;
  primaryGradient: string;
  base: string;
  border: string;
  bg: string;
  text: string;
  grayLighter: string;
}

interface Styles {
  containerMaxWidth: string;
  colors: Colors;
  breakPoints: BreakPoints;
}

interface Tag {
  id: string;
  title: string;
}

interface List {
  title: string;
}

interface Widgets {
  categoryList: List;
  tagList: List;
}

export interface BlogConfig {
  siteLogo: SiteLogo;
  siteUrl: string;
  siteName: string;
  title: string;
  description: string;
  googleAnalyticsCode: string;
  googleAdsenseCode: string;
  notFoundPage: Hero;
  topPage: Page;
  categoryPage: Page;
  widgets: Widgets;
  styles: Styles;
  hero: Hero;
  navigation: Navigation[];
  subNavigation: Navigation[];
  account: Account;
  writers: Account[];
  article: Article;
  categories: Category[];
  tags: Tag[];
}
