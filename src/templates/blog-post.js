import React from "react";
import { graphql, Link } from "gatsby";
import "../styles/post.css";
import Seo from "../components/seo/seo";
import Layout from "../components/layout";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const {
    frontmatter: { title, date, subject, slug, keywords },
    html,
    excerpt,
  } = data.post;
  const { edges } = data.relatedTopics;
  const subjects = data.subjectsWithPostSlug.group.map((group) => {
    return {
      title: group.fieldValue,
      postSlug: group.edges[0].node.frontmatter.slug
    }
  })


  const showTopicList = () => {
    return (
      <div className="blog-post-topics">
        {" "}
        {edges.map((edge) => {
          const { slug, topic } = edge.node.frontmatter;
          return (
            <Link key={slug} style={{ boxShadow: `none` }} to={`/${slug}`}>
              <p>{topic}</p>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <Layout currentSubject={subject} subjects={subjects}>
      <Seo
        keywords={keywords}
        title={title}
        postSlug={slug}
        date={date}
        description={excerpt}
        isBlogPost={true}
      />
      <div className="blog-post-container">
        {showTopicList()}
        <div className="blog-post">
          <h1>{title}</h1>
          <h2>{date}</h2>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($slug: String!, $subject: String!) {
    post: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        subject
        keywords
      }
    }

    relatedTopics: allMarkdownRemark(
      filter: { frontmatter: { subject: { eq: $subject } } }
      sort: { fields: frontmatter___topicIndex, order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            topic
            slug
          }
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
