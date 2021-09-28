const graphql = require("graphql");
const ClientType = require("./ClientType");
const ServiceType = require("./ServiceType");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const AppointmentType = new GraphQLObjectType({
  name: "AppointmentType",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    date: { type: GraphQLString },
    startTime: { type: GraphQLString },
    morningOrEvening: { type: GraphQLString },
    endTime: { type: GraphQLString },
    duration: { type: GraphQLInt },
    price: { type: GraphQLInt },
    professional: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    bookedWithCardID: { type: GraphQLString },
    client: { type: ClientType },
    services: { type: new GraphQLList(ServiceType) },
    notes: { type: GraphQLString },
    confirmed: { type: GraphQLBoolean },
  }),
});

module.exports = AppointmentType;
