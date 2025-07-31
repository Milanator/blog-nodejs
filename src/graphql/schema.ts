import { buildSchema } from "graphql";

export default buildSchema(`
    type HelloWorld {
        message: String
        views: Int
    }

    type RootQuery {
        firstExample: HelloWorld!
    }



    type User {
        _id: ID!
        email: String!
        password: String!
        name: String
        imageUrl: String
    }

    input SignUpData {
        email: String!
        password: String!
        name: String!
    }

    input LoginData {
        email: String!
        password: String!
    }

    type LoginResponse {
        message: String!
        user: User
        token: String!
    }

    type RootMutation {
        signUp(userInput: SignUpData): User!
        login(userInput: LoginData): LoginResponse
    }


    schema {
        query: RootQuery
        mutation: RootMutation
    }    
`);
