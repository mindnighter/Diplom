const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
  resources: [Resource!]
  authors: [Author!]
  titles: [Title!]
  directions: [Direction!]
  professions: [Profession!]
  specializations: [Specialization!]
  udcs: [Udc!]
  contents: [Content!]
  findResourceBy(
    author: Boolean, subAuthor: Boolean, title: Boolean, direction: Boolean,
    profession: Boolean, specialization: Boolean, udc: Boolean, content: Boolean, consist: String!
  ): [Resource]
  findResourceByTitle(consist: String!): [Resource]
}

type Mutation {
  postResource(
    author: String, subAuthor: String, title: String, direction: String,
    profession: String, specialization: String, udc: String, content: String
  ): Resource,
  singleUpload(file: Upload!, type: String!): File!,
}

type File {
  filename: String!
  mimetype: String!
  encoding: String!
}

type Resource {
  id: ID!
  author: [Author]
  subAuthor: [Author]
  title: Title
  direction: Direction
  profession: Profession
  specialization: Specialization
  udc: Udc
  content: Content
}

type Author {
  id: ID!
  fullName: String!
}

type Title {
  id: ID!
  title: String!
}

type Direction {
  id: ID!
  code: String!
}

type Profession {
  id: ID!
  profession: String!
}

type Specialization {
  id: ID!
  specialization: String!
}

type Udc {
  id: ID!
  udc: String!
}

type Content {
  id: ID!
  content: String!
}
`;

module.exports = typeDefs;
