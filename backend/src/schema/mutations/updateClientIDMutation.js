const graphql = require("graphql");
const ClientType = require("../types/ClientType");
const Client = require("../../models/client");

const { GraphQLString } = graphql;

const updateClientIDMutation = {
  type: ClientType,
  args: {
    customerId: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    let matchedClient;
    let filter = {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
    };

    const update = {
      customerId: args.customerId,
    };

    matchedClient = await Client.findOneAndUpdate(filter, update, {
      new: true,
    });

    const res = matchedClient.save();

    return {
      ...res,
      id: matchedClient._id,
      customerId: matchedClient.customerId,
      firstName: matchedClient.firstName,
      lastName: matchedClient.lastName,
      email: matchedClient.email,
      phoneNumber: matchedClient.phoneNumber,
      password: matchedClient.password,
    };
  },
};

module.exports = updateClientIDMutation;
