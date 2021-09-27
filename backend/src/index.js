const express = require("express");
const compression = require("compression");
const { graphqlHTTP } = require("express-graphql");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("apollo-server");
const { GooglePubSub } = require("@axelspringer/graphql-google-pubsub");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Appointment = require("./models/appointment");
const Client = require("./models/client");
const Employee = require("./models/employee");
const Notification = require("./models/notification");
const dbConnect = require("./config/dbConnect");

// Fix Puppeteer memory leak issue
process.setMaxListeners(Infinity);

// Hide usernames and passwords
require("dotenv").config();

const app = express();

app.use(cookieParser());

// Connect to MongoDB with Mongoose
dbConnect();

// Compress all responses
app.use(compression());

// Prevent request entity too large errors
app.use(express.json({ limit: "50mb" }));

// Cross-Origin Requests
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.PRODUCTION_CLIENT_URL
        : "http://localhost:3000",
    credentials: true,
  })
);

// Allow 200 responses, but not 304 not modified
app.disable("etag");


const googlePubSubOptions = {
  projectId: process.env.GOOGLE_PUB_SUB_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_PUB_SUB_CLIENT_EMAIL,
    private_key: (
      process.env.GOOGLE_PUB_SUB_PRIVATE_KEY_PART_ONE +
      process.env.GOOGLE_PUB_SUB_PRIVATE_KEY_PART_TWO
    ).replace(new RegExp("\\\\n", "g"), "\n"),
  },
};

const pubsub =
  process.env.NODE_ENV === "production"
    ? new GooglePubSub(googlePubSubOptions)
    : new PubSub();

// Set pubsub as universal context
app.use((req, res, next) => {
  req.pubsub = pubsub;
  return next();
});

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    return {
      req,
      res,
      pubsub,
    };
  },
  playground: process.env.NODE_ENV === "production" ? false : true,
});


app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "production" ? false : true,
  })
);

apolloServer.applyMiddleware({
  app,
});

app.get(
  "/playground",
  process.env.NODE_ENV === "production"
    ? (req, res, next) => res.send("No playground in production!")
    : expressPlayground({ endpoint: "/graphql" })
);

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 4000;

httpServer.listen(port, () => {
  console.log(
    `🚀 Server ready at ${
      process.env.NODE_ENV === "production"
        ? process.env.PRODUCTION_SERVER_URL + apolloServer.graphqlPath
        : "http://localhost:" + port + apolloServer.graphqlPath
    }`
  );
  console.log(
    `🚀 Subscriptions ready at ${
      process.env.NODE_ENV === "production"
        ? "wss://" +
          process.env.PRODUCTION_SERVER_ROOT +
          apolloServer.subscriptionsPath
        : "ws://localhost:" + port + apolloServer.subscriptionsPath
    }`
  );
});