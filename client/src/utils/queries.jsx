import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query Users {
        users {
            _id
            username
            email
            events_created {
                _id 
                title
            }
        }
    }
`

export const GET_USER = gql`
    query findUser($email: String!) {
        user(email: $email) {
            _id
            username
            email
            events_created {
                _id
                title
                description
                price
                date
            }
        }
    }
`

export const GET_EVENTS = gql`
    query Events {
        events {
            _id
            title
            description
            date
            price
            creator {
                _id
                username
            }
        }
    }
`

export const GET_EVENT = gql`
    query findEvent($id: ID!) {
        event(_id: $id) {
            _id
            title
            description
            date
            price
            creator {
                username
                email
            }
        }
    }
`