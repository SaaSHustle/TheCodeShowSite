module.exports = {
  siteMetadata: {
    title: `TheCodeShow`,
    siteUrl: `https://www.thecodeshow.com`,
    author: `Bharat Sunel`,
    description: `React, Redux, JavaScript, Firebase, Kotlin, Android development Tutorials`,
    image: `https://github.com/TheCodeShowOfficial/TheCodeShowSite/blob/master/content/assets/bharatsunel.jpg?raw=true`,
    social: {
      twitter: `bharatsunel205`,
    },
    organization: {
      name: 'thecodeshow.com',
      url: 'https://www.thecodeshow.com',
      logo: 'https://github.com/TheCodeShowOfficial/TheCodeShowSite/blob/master/content/assets/icon.svg',
    },
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "trackingid",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "./src/assets/",
      },
      __key: "assets",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown-pages",
        path: "./src/markdown-pages",
      },
      __key: "markdown-pages",
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Open Sans`,
            file: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap`,
          },
          {
            name: `Roboto`,
            file: `https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&display=swap`,
          }
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.thecodeshow.com`,
        stripQueryString: true,
      },
    },
    `gatsby-plugin-sass`,
  ],
};
