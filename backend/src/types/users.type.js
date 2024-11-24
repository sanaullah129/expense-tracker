const userTypeDef = `#graphql
    type User {
        _id: ID!
        username: String!
        name: String!
        password: String!
        profilePicture: String
        gender: String!
    }

    type LogoutResponse {
        message: String!
    }

    type Query {
        users: [User!]
        authUser: User #user would be null if not authenticated user is found
        user(userId: ID!): User
    }

    type Mutation {
        signUp(input: SignUpInput): User
        login(input: LoginInput): User
        logout: LogoutResponse
    }

    input SignUpInput {
        username: String!
        name: String!
        password: String!
        gender: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }
`;

export default userTypeDef;