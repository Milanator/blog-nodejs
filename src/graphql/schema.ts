import { buildSchema } from "graphql";

export default buildSchema(`
    type Post {
         _id: ID!
         text: String!
         imageUrl: String!
         userId: User!
         createdAt: String!
         updatedAt: String!
    }

    type getPostsQuery {
        page: Int
        totalPages: Int
        items: [Post]
    }

    type RootQuery {
        getPosts(page: Int, perPage: Int): getPostsQuery
    }



    type User {
        _id: ID!
        email: String!
        password: String!
        name: String
        imageUrl: String
    }

    input StorePostData {
        text: String!
        imageUrl: String!
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

    type storePostResponse {
        item: Post!
        message: String!
    }

    type RootMutation {
        signUp(userInput: SignUpData): User!
        login(userInput: LoginData): LoginResponse
        storePost(postInput: StorePostData): storePostResponse!
    }


    schema {
        query: RootQuery
        mutation: RootMutation
    }    
`);
