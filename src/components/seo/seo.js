/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

 import React from "react"
 import PropTypes from "prop-types"
 import {Helmet} from "react-helmet"
 import { useStaticQuery, graphql } from "gatsby"
 import SchemaOrg from '../seo/SchemaOrg.js';
 function Seo({title,keywords,date,description, lang , postImage, postSlug, isBlogPost}) {
 
 
   /*
   Below we are querying site metadata. i.e. info related to site. Use it as fallback values for meta attributes.
   "siteMetadata": {
         "title": "Bharat Sunel",
         "description": "Blog for frontend web developers",
         "author": "Bharat Sunel"
       }
   */
   const { site } = useStaticQuery(
     graphql`
       query {
         site {
           siteMetadata {
             title
             description
             siteUrl
             image
             author
             organization {
               name
               url
               logo
             }
             social {
               twitter
               
             }
           }
         }
       }
     `
   )
 
       const siteMeta = site.siteMetadata
    
       const seoTitle = title || siteMeta.title;
 
 
       /* Write Good first Para of each post.*/
       const seoDescription = description || siteMeta.description;
 
       /* Need to add one image key in the frontmatter of markdown post, 
       then update query in blog-post.js to retrieve image PublicUrl, then update here to use it*/
       const image = postImage ? `${siteMeta.siteUrl}${postImage}` : siteMeta.image;
       const url = postSlug
         ? `${siteMeta.siteUrl}/${postSlug}`
         : siteMeta.siteUrl;
       
       const datePublished = isBlogPost ? date : false;
 
   return (
     <>
     <Helmet
       htmlAttributes={{
         lang,
       }}
     >
             <title>{seoTitle}</title>
             <meta name="description" content={seoDescription} />
             <meta name="author" content={siteMeta.author} />
             <meta name="keywords" content={keywords.join(`, `)} />
             <meta name="image" content={image} />
             {/* Commented cannonical bcz we are adding this tag using a plugin*/}
             {/*  <link rel="canonical" href={url} /> */}
            
 
             {/* OpenGraph tags */}
             <meta property="og:url" content={url} />
             {isBlogPost ? <meta property="og:type" content="article" /> : null}
             <meta property="og:title" content={seoTitle} />
             <meta property="og:description" content={seoDescription} />
             <meta property="og:image" content={image} />
             {/*  <meta property="fb:app_id" content={seo.social.fbAppID} /> */}
            
 
             {/* Twitter Card tags */}
             <meta name="twitter:card" content="summary_large_image" />
             <meta name="twitter:creator" content={siteMeta.social.twitter} />
             <meta name="twitter:title" content={seoTitle} />
             <meta name="twitter:description" content={seoDescription} />
             <meta name="twitter:image" content={image} />
 
     </Helmet>
 
   <SchemaOrg
             isBlogPost={isBlogPost}
             url={url}
             title={seoTitle}
             image={image}
             description={seoDescription}
             datePublished={datePublished}
             siteUrl={siteMeta.siteUrl}
             author={siteMeta.author}
             organization={siteMeta.organization}
             defaultTitle={siteMeta.title}
           />
 
     </>
   )
 }
 
 Seo.defaultProps = {
   isBlogPost: false,
   postImage: null,
   postSlug: null,
   keywords: [],
   lang: `en`,
 }
 
 Seo.propTypes = {
   isBlogPost: PropTypes.bool,
   postImage: PropTypes.string,
   lang: PropTypes.string,
 }
 
 export default Seo