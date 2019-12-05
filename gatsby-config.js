const proxy = require("http-proxy-middleware")

module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    siteUrl: "https://ssangha.io",
    pathPrefix: "/",
    title: "Shawn Sangha",
    titleAlt: "Shawn Sangha",
    description:
      "Shawn Sangha. Front-end developer currently based in Calgary.",
    banner: "/img/card.jpg",
    headline: "Dev portfolio of Shawn Sangha",
    siteLanguage: "en",
    author: "Shawn Sangha",
    ogLanguage: "en_US",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/content`,
        name: "cmsContent",
      },
    },

    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-transformer-sharp",
      options: {
        stripMetadata: true,
        defaultQuality: 75,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 2048,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
        layout: require.resolve(`./src/layouts/index.tsx`),
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Shawn Sangha`,
        short_name: `Shawn Sangha`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/img/card.jpg`,
      },
    },
    "gatsby-plugin-netlify-cms",
    `gatsby-plugin-offline`,
    // "gatsby-plugin-netlify"
  ],
}
