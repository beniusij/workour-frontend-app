import React from 'react'
import useForm from '../../hooks/UseForm.js'
import Button from '../button/Button.js'
import MandatoryInputField from '../field/MandatoryInputField.js'
import MandatoryCheckboxField from '../field/MandatoryCheckboxField.js'
import styles from './Form.module.scss'
import {gql} from "apollo-boost"
import { useMutation } from '@apollo/react-hooks'

function RegisterForm() {
  const stateSchema = {
    firstname: { value: '', error: '' },
    lastname: { value: '', error: '' },
    email: { value: '', error: '' },
    password: { value: '', error: '' },
    confirmpassword: { value: '', error: '' },
    termsandconditions: { value: '', error: '' },
  }

  const validationStateSchema = {
    firstname: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z]+$/,
        error: 'Invalid first name format.',
      },
    },
    lastname: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z]+$/,
        error: 'Invalid first name format.',
      },
    },
    email: {
      required: true,
      validator: {
        regEx: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i,
        error: 'Invalid email address.',
      },
    },
    password: {
      required: true,
      validator: {
        regEx: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        error: 'Invalid password. It must be minimum of 8 chars, contain a number, upper case & lower case characters.',
      },
    },
    confirmpassword: {
      required: true,
      validator: {
        regEx: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        error: 'Invalid password. It must be minimum of 8 chars, contain a number, upper case & lower case characters.',
      },
    },
    termsandconditions: {
      required: true,
      validator: {
        checked: true,
        error: 'User must accept our terms and conditions to proceed with registration.'
      }
    }
  }

  const registerMutation = gql`
    mutation RegisterMutation($first_name: String!, $last_name: String!, $email: String!, $password: String!, $password_confirm: String!) {
      register(first_name: $first_name, last_name: $last_name, email: $email, password: $password, password_confirm: $password_confirm) {
        ID
      }
    }
  `

  const [register, { data }] = useMutation(registerMutation)

  const onSubmitForm = event => {
    register({
      variables: {
        first_name: event.firstname.value,
        last_name: event.lastname.value,
        email: event.email.value,
        password: event.password.value,
        password_confirm: event.confirmpassword.value
      }
    })
  }

  const { state, disable, handleOnChange, handleOnSubmit } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  )

  return (
    <div className={styles.formContainer} >
      <h2 className={styles.formTitle}>Sign Up</h2>
        <form onSubmit={handleOnSubmit}>
          <MandatoryInputField
            name="First Name"
            type="text"
            function={handleOnChange}
            error={state.firstname.error}
          />
          <MandatoryInputField
            name="Last Name"
            type="text"
            function={handleOnChange}
            error={state.lastname.error}
          />
          <MandatoryInputField
            name="Email"
            type="email"
            function={handleOnChange}
            error={state.email.error}
          />
          <MandatoryInputField
            name="Password"
            type="password"
            function={handleOnChange}
            error={state.password.error}
          />
          <MandatoryInputField
            name="Confirm Password"
            type="password"
            function={handleOnChange}
            error={state.confirmpassword.error}
          />
          <MandatoryCheckboxField
            name="Terms and Conditions"
            type="checkbox"
            function={handleOnChange}
            error={state.termsandconditions.error}
          />
          <Button type={'submit'} text={'Sign In'} disabled={disable} />
        </form>
    </div>
  )
}

export default RegisterForm