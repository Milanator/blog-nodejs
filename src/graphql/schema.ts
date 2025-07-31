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

    input UserInputData {
        email: String!
        password: String!
        name: String!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
    }


    schema {
        query: RootQuery
        mutation: RootMutation
    }    
`);
