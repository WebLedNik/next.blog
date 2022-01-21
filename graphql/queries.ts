import {
    fragmentAuthorFields,
    fragmentCategories,
    fragmentCommentFields,
    fragmentImage,
    fragmentPostFields,
    fragmentTags, fragmentUserFields
} from "./fragments";

export const queryGetMorePostsUseTagsSlug = `
            ${fragmentTags}
            ${fragmentCategories}
            ${fragmentImage}
            ${fragmentAuthorFields}
            ${fragmentPostFields}
            query PostsUseTagsSlug($slugs: [String]!){
             posts(first: 10, where: {tagSlugIn: $slugs, orderby: {field: COMMENT_COUNT, order: DESC}}) {
                nodes {
                    ...PostFields
                }
            }
        }`

export const queryGetTagsOfCategory = ` 
           ${fragmentTags}
           query TagsOfCategory($slug:[String]!){
                categories(where: {slug: $slug}){
                    nodes {
                      posts{
                          nodes {
                              tags(where: {order: DESC, orderby: COUNT}, first: 10) {
                                nodes {
                                   ...TagsFields
                                }
                              }
                        }
                      }
                    } 
                }
           }`

export const queryGetCategoryUseSlugAndTagName = ` 
           ${fragmentTags}
           ${fragmentImage}
           ${fragmentAuthorFields}
           ${fragmentPostFields}
           ${fragmentCategories}
           query CategoryWithSlugAndTagName($slug:[String]!, $tagName:[String]!){
                categories(where: {slug: $slug}){
                    nodes {
                        ...CategoriesFields
                        posts(first: 10, where: {tagSlugAnd: $tagName, orderby: {field: DATE, order: DESC}}) {
                            nodes {
                              ...PostFields
                            }
                          }
                    } 
                }
           }`

export const queryGetCategoryUseSlug = ` 
           ${fragmentTags}
           ${fragmentImage}
           ${fragmentAuthorFields}
           ${fragmentPostFields}
           ${fragmentCategories}
           query CategoryWithSlug($slug:[String]!){
                categories(where: {slug: $slug}){
                    nodes {
                        ...CategoriesFields
                        posts(first: 10, where: {orderby: {field: DATE, order: DESC}}) {
                            nodes {
                              ...PostFields
                            }
                          }
                    } 
                }
           }`

export const queryGetAllCategories = `
            ${fragmentCategories}
            query getCategories {
              categories(where: {order: DESC, orderby: COUNT}) {
                  nodes {
                    ...CategoriesFields
                  }
              }
            }`

export const queryGetPostUseSlug = ` 
           ${fragmentTags}
           ${fragmentCategories}
           ${fragmentImage}
           ${fragmentAuthorFields}
           ${fragmentCommentFields}
           query PostWithSlug($slug:String!){
                postBy(slug: $slug){
                    id
                    content
                    date
                    dateGmt
                    excerpt
                    commentCount
                    slug
                    title
                    postId
                    categories{
                        nodes {
                        ...CategoriesFields
                        }
                    }
                    featuredImage {
                        node {
                          ...ImageFields
                        }
                    }
                    author {
                        node {
                            ...AuthorFields
                        }
                    }
                    tags {
                        nodes {
                           ...TagsFields
                        }
                    }
                    comments(where: {parentIn: "", orderby: COMMENT_DATE, order: DESC}) {
                      nodes {
                        ...CommentFields
                        replies(where: {order: DESC, orderby: COMMENT_DATE}) {
                          nodes {
                            ...CommentFields
                            replies(where: {order: DESC, orderby: COMMENT_DATE}) {
                              nodes {
                                ...CommentFields
                                replies(where: {order: DESC, orderby: COMMENT_DATE}) {
                                  nodes {
                                    ...CommentFields
                                    replies(where: {order: DESC, orderby: COMMENT_DATE}) {
                                      nodes {
                                        ...CommentFields
                                        replies(where: {order: DESC, orderby: COMMENT_DATE}) {
                                          nodes {
                                            ...CommentFields
                                            replies(where: {order: DESC, orderby: COMMENT_DATE}) {
                                              nodes {
                                                ...CommentFields
                                                replies(where: {order: DESC, orderby: COMMENT_DATE}) {
                                                  nodes {
                                                    ...CommentFields
                                                    replies(where: {order: DESC, orderby: COMMENT_DATE}) {
                                                      nodes {
                                                        ...CommentFields
                                                        replies(where: {order: DESC, orderby: COMMENT_DATE}) {
                                                          nodes {
                                                            ...CommentFields
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                }
            }`

export const queryGetNewPosts = `
            ${fragmentTags}
            ${fragmentCategories}
            ${fragmentImage}
            ${fragmentAuthorFields}
            ${fragmentPostFields}
            query NewPosts{
             posts(first: 10, where: {orderby: {field: DATE, order: DESC}}) {
                nodes {
                    ...PostFields
                }
            }
        }`

export const queryGetPopularPosts = `
            ${fragmentTags}
            ${fragmentCategories}
            ${fragmentImage}
            ${fragmentAuthorFields}
            ${fragmentPostFields}
            query AllPosts($day: Int!, $month: Int!, $year: Int!){
             posts(first: 10, where: {dateQuery: {column: DATE, after: {day: $day, month: $month, year: $year}}, orderby: {field: COMMENT_COUNT, order: DESC}}) {
                nodes {
                    ...PostFields
                }
            }
        }`

export const queryGetUser = `
            ${fragmentUserFields}
            query AllPosts($login: String!){
             users(where: {login: $login}) {
                nodes{
                    ...UserFields
                }
              }
            }`
