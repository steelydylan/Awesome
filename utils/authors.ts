type AuthorProps = {
  name: string;
  avatar: string;
  twitterUsername: string;
};

export const authors: AuthorProps[] = [
  {
    name: "steelydylan",
    avatar: "/images/steelydylan.png",
    twitterUsername: "steelydylan",
  },
];

export const getAuthorFromName = (name: string) => {
  return authors.find((author) => {
    return author.name === name;
  });
};
