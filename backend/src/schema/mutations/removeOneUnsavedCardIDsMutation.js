const graphql = require("graphql");
const ClientType = require("../types/ClientType");
const Client = require("../../models/client");
const { UserInputError } = require("apollo-server");

const { GraphQLString } = graphql;

const removeOneUnsavedCardIDsMutation = {
  type: ClientType,
  args: {
    unsavedCardID: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    const client = await Client.findOne({
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
    });

    if (!client) {
      throw new UserInputError("No registered client found.", {
        errors: {
          email: "No registered client found.",
        },
      });
    } else {
      client.unsavedCardIDs.splice(
        client.unsavedCardIDs.indexOf(args.unsavedCardID),
        1
      );

      const res = client.save();

      return {
        ...res,
        _id: client._id,
        customerId: client.customerId,
        unsavedSquareCardIDs: client.unsavedCardIDs,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phoneNumber: client.phoneNumber,
        password: client.password,
      };
    }
  },
};

module.exports = removeOneUnsavedCardIDsMutation;
