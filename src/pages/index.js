import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";


const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};
const headingAccentStyles = {
  color: "#663399",
};

const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
};
const listItemStyles = {
  fontWeight: 300,
  fontSize: 24,
  maxWidth: 560,
  marginBottom: 30,
};

const linkStyle = {
  color: "#8954A8",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
};

const descriptionStyle = {
  color: "#232129",
  fontSize: 14,
  marginTop: 10,
  marginBottom: 0,
  lineHeight: 1.25,
};

const badgeStyle = {
  color: "#fff",
  backgroundColor: "#088413",
  border: "1px solid #088413",
  fontSize: 11,
  fontWeight: "bold",
  letterSpacing: 1,
  borderRadius: 4,
  padding: "4px 6px",
  display: "inline-block",
  position: "relative",
  top: -2,
  marginLeft: 10,
  lineHeight: 1,
};

const colors = [
  {
    color: "#E95800",
  },
  {
    color: "#1099A8",
  },
  {
    color: "#BC027F",
  },
  {
    color: "#0D96F2",
  },
  {
    color: "#8EB814",
  },
  {
    color: "#663399",
  },
];

const IndexPage = ({ data }) => {
  const totalColors = colors.length;

  const posts = data.recentPosts.edges.map(({ node }) => {
    return {
      excerpt: node.excerpt,
      title: node.frontmatter.title,
      slug: node.frontmatter.slug,
      date: node.frontmatter.date,
    };
  });

  const subjects = data.subjectsWithPostSlug.group.map((group) => {
    return {
      title: group.fieldValue,
      postSlug: group.edges[0].node.frontmatter.slug,
    };
  });

  return (
    <Layout subjects={subjects}>
      <main style={pageStyles}>
        <h1 style={headingStyles}>
          Articles
          <br />
          <span style={headingAccentStyles}>— to get started 🎉🎉</span>
        </h1>

        <ul style={listStyles}>
          {posts.map(({ slug, excerpt, title, date }, index) => {
            return (
              <li
                key={slug}
                style={{
                  ...listItemStyles,
                  color: colors[index % totalColors].color,
                }}
              >
                <span>
                  <Link to={`/${slug}`} style={linkStyle}>
                    {title}
                  </Link>
                  {
                    isNewPost(date) ? <span style={badgeStyle} aria-label="New Badge">
                    NEW!
                  </span> : ''
                  }
                  
                  <p style={descriptionStyle}>{excerpt}</p>
                </span>
              </li>
            );
          })}
        </ul>
      </main>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>The Code Show</title>;

const isNewPost = (dateString) => {
  const then = new Date(dateString);
  const now = new Date();

  const msBetweenDates = Math.abs(then.getTime() - now.getTime());

  // 👇️ convert ms to days                 hour   min  sec   ms
  const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);

  if (daysBetweenDates < 30) {
    return true
  } else {
    return false
  }
};

export const pageQuery = graphql`
  query {
    recentPosts: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 20
    ) {
      edges {
        node {
          frontmatter {
            slug
            title
            date
          }
          excerpt
        }
      }
    }

    subjects: allMarkdownRemark {
      distinct(field: frontmatter___subject)
    }

    subjectsWithPostSlug: allMarkdownRemark {
      group(field: frontmatter___subject, limit: 1) {
        fieldValue
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  }
`;
