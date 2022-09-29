  exports.createPages = async function ({ actions, graphql }) {
    const { data } = await graphql(`
    query {
        allMarkdownRemark(limit: 10, sort: {fields: frontmatter___date, order: DESC}) {
          nodes {
            frontmatter {
              slug
              subject
            }
          }
        }
      }
    `)
    data.allMarkdownRemark.nodes.forEach(node => {
      const slug = node.frontmatter.slug
      const subject = node.frontmatter.subject
      actions.createPage({
        path: slug,
        component: require.resolve(`./src/templates/blog-post.js`),
        context: { slug: slug, subject: subject },
      })
    })
  }