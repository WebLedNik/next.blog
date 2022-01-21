import {fragmentAuthorFields, fragmentCommentFields} from "./fragments";

export const mutationCreateUser = `
mutation mutationCreateUser($email: String!, $name: String!, $password: String!) {
  createUser(
    input: {username: $email, email: $email, nickname: $name, password: $password, displayName: $name}
  ){
    clientMutationId
  }
}
`

export const mutationLoginAdmin = `
mutation mutationLoginAdmin {
  login(
    input: {
      clientMutationId: "uniqueId"
      password: "wE2xW1mA"
      username: "admin"
    }
  ) {
    refreshToken
  }
}
`

export const mutationCreateComment = `
    ${fragmentCommentFields}
    ${fragmentAuthorFields}
    mutation mutationCreateComment($parent: ID, $commentOn: Int!, $content:String!) {
      createComment(input: {parent: $parent, commentOn: $commentOn, content: $content}) {
          comment {
            ...CommentFields
            }
      }
    }
`

export const mutationRegisterUser = `
mutation mutationRegisterUser($email: String!, $username: String!, $displayName: String!, $password: String!){
  registerUser(
    input: {
        clientMutationId: "uniqueId",
        username: $username,
        displayName: $displayName,
        password: $password,
        email: $email
    }){
    user {
      jwtAuthToken
      jwtRefreshToken
    }
  }
}
`

export const mutationLoginUser = `
mutation mutationLoginUser($name: String!, $password: String!) {
  login( input: {
    clientMutationId: "uniqueId",
    username: $name,
    password: $password
  }) {
    authToken
    refreshToken
    user {
      id
    }
  }
}
`

export const mutationRefreshAuthToken = `
mutation mutationRefreshAuthToken($refreshToken: String!) {
  refreshJwtAuthToken(
    input: {
      clientMutationId: "uniqueId"
      jwtRefreshToken: $refreshToken,
  }) {
    authToken
  }
}
`
