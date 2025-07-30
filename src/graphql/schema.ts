import { buildSchema } from "graphql";

export default buildSchema(`
    type HelloWorld {
        message: String
        views: Int
    }

    type RootQuery {
        firstExample: HelloWorld!
    }

    schema {
        query: RootQuery
    }    
`);
