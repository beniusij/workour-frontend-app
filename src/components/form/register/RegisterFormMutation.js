import { commitMutation } from 'react-relay'
import { graphql } from 'babel-plugin-relay/macro'

const registerFormMutation = graphql`
  mutation RegisterFormMutation($input: UserRegisterInput!) {
    userRegister(input: $input) {
      id
    }
  }
`

function commit(
  environment,
  registerForm
) {
  return commitMutation(
    environment,
    {
      mutation: registerFormMutation,
      variables: {
        input: {
          first_name: registerForm.first_name,
          last_name: registerForm.last_name,
          email: registerForm.email,
          password: registerForm.password,
          password_confirm: registerForm.password_confirm,
        },
      }
    }
  )
}

export default {commit}