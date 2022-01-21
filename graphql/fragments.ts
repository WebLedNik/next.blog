export const fragmentUserFields =
    `fragment UserFields on User{
                id
                name
                email
            }`


export const fragmentAuthorFields =
    `fragment AuthorFields on User{
                id
                name
                email
                slug
                lastName
                firstName
                avatar {
                    url
                }
            }`

export const fragmentCommentFields =
    `fragment CommentFields on Comment {
      id
      date
      type
      approved
      content
      parentId
      commentId
      author {
          node {
            ...AuthorFields
          }
      }
    }`

export const fragmentImage =
    `fragment ImageFields on MediaItem {
       mediaItemUrl
       altText
       caption
    }`

export const fragmentCategories =
    `fragment CategoriesFields on Category {
        id
        count
        slug
        name
        description
    }`

export const fragmentPostFields =
    `fragment PostFields on Post{
                id
                title
                slug
                date
                excerpt
                commentCount
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
            }`

export const fragmentTags =
    `fragment TagsFields on Tag {
        id
        slug
        name
    }`
