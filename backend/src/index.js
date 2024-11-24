import { ApolloServer } from "@apollo/server";
import mergedResolvers from "./resolvers/index.js";
import mergedTypes from "./types/index.js";
import { buildContext } from "graphql-passport";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import connectDb from "./db/connectDb.js";
import passport from "passport";
import ConnectMongo from "connect-mongodb-session";
import session from "express-session";
import { configurePassport } from "./passport/passport.config.js";

dotenv.config();

configurePassport();
const app = express();

const httpServer = http.createServer(app);
const MongoDbStore = ConnectMongo(session);

const store = new MongoDbStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

store.on("error", (error) => {
  console.log(error);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // this option specifies whether save the sessions to the store on every request
    saveUninitialized: false, // option specifies whether to save uninitialized sessions
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true, // prevents xxs attacks
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
app.use(
  "/graphql",
  cors({
    origin: "http://localhost:3000/",
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async (req, res) => buildContext({ req, res }),
  })
);
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDb();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
