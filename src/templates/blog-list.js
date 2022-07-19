import React from "react";
import { graphql, Link } from "gatsby";
import BlogPost from '../components/BlogPost';
import Layout from '../components/Layout';
import styles from './blog-list-module.css';
export default function BlogListTemplate({ data, pageContext }) {
    // generate previous and next page urls
    const previousPage = pageContext.currentPage === 2 ?
        '/blog' :
        `/blog/${pageContext.currentPage - 1}`;
    const nextPage = `/blog/${pageContext.currentPage + 1}`;
    return (
        <Layout>
            <div id={styles.hero}>
                <h1>The Coffee Blog</h1>
            </div>
            <main className={styles.blogList}>
                {data.allMarkdownRemark.edges.map(node => (
                    <BlogPost 
                        key={node.node.id}
                        slug={node.node.fields.slug}
                        title={node.node.frontmatter.title}
                        date={node.node.frontmatter.date}
                        excerpt={node.node.excerpt} />
                ))}
            </main>
            <div id={styles.pageLinks}>
                {pageContext.currentPage > 1 && (
                    <Link to={previousPage}>
                         Previous Page
                    </Link>
                )}
                {pageContext.currentPage < pageContext.pageCount && (
                    <Link to={nextPage}>
                        Next Page 
                    </Link>
                )}
            </div>
        </Layout>
    )
}
// page query
export const query = graphql`
    query BlogListQuery($skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "MMMM D, YYYY")
                    }
                    fields {
                        slug
                    }
                    excerpt
                }
            }
        }
    }
`;