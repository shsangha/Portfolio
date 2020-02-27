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
      skills: allContentfulSkill(sort: { fields: title, order: ASC }) {
        edges {
          next {
            slug
            title
          }

          node {
            id
            title
            slug
          }
        }
      }

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
  `)
    .then(({ data: { work, skills } }) => {
      work.edges.map(({ node: { id, slug }, next }) => {
        createPage({
          path: `/work/${slug}`,
          component: path.resolve("./src/templates/work/index.tsx"),
          context: {
            id,
            next,
          },
        })
      })

      skills.edges.map(({ node: { id, slug }, next }) => {
        createPage({
          path: `/skills/${slug}`,
          component: path.resolve("./src/templates/skill/index.tsx"),
          context: {
            id,
            next,
          },
        })
      })
    })
    .catch(e => {
      reporter.panicOnBuild(e.message, "error in node")
    })
}
