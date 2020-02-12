const path = require("path")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        TweenLite: path.resolve(
          path.join(__dirname, "node_modules/gsap/src/uncompressed/TweenLite")
        ),
      },
    },
  })
}

exports.createPages = ({ actions: { createPage }, graphql, reporter }) => {
  return graphql(`
    query Pages {
      work: allContentfulProject {
        edges {
          next {
            title
            slug
          }
          node {
            id
            title
            slug
          }
        }
      }
    }
  `).then(
    ({
      data: {
        work: { edges },
      },
    }) => {
      edges.map(({ node: { id, title, slug }, next }) => {
        createPage({
          path: `/work/${slug}`,
          component: path.resolve("./src/templates/work/index.tsx"),
          context: {
            id,
            next,
          },
        })
      })
    }
  )
}
