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
  createPage({
    path: "/work/example",
    component: path.resolve("./src/templates/work/index.tsx"),
    context: {},
  })

  createPage({
    path: "/skills/example",
    component: path.resolve("./src/templates/skill/index.tsx"),
    context: {},
  })
}
