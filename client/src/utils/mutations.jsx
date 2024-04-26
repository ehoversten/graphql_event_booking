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

export const NEW_EVENT = gql`
    mutation addEvent($title: String!, $description: String!, $price: Float, $date: String!, $creator: ID!) {
        addEvent(title: $title, description: $description, price: $price, date: $date, creator: $creator) {
            _id
            title
            description
            price
            date
        }
    }
`

export const ADD_EVENT = gql`
    mutation addNewEvent($eventInput: EventInput!) {
        addNewEvent(eventInput: $eventInput) {
            msg
            err
        }
    }
`