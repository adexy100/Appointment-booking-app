const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const ClientType = new GraphQLObjectType({
  name: "ClientType",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    customerId: { type: GraphQLString },
    unsavedCardIDs: { type: new GraphQLList(GraphQLString) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    profilePicture: { type: GraphQLString },
    password: { type: GraphQLString },
    accessToken: { type: GraphQLString },
    refreshToken: { type: GraphQLString },
    tokenCount: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = ClientType;
