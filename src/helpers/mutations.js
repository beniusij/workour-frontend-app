import {gql} from "apollo-boost";

export const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      Token
      Email
    }
  }
`