import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`

export const REGISTER = gql`
    mutation register($userInput: UserInput!) {
        register(userInput: $userInput) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`