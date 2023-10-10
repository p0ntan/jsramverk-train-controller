/**
 * Indexfile for graphQL, defining schema and such
 */
// GraphQL imports & setup
const {
    GraphQLSchema
} = require("graphql");

const RootQueryType = require("./root.js");
const RootMutationType = require("./mutation.js");

// GraphQL route
const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

module.exports = schema;
