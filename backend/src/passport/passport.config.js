import passport from "passport";
import bcrypt from "bcryptjs";
import { GraphQLLocalStrategy } from "graphql-passport";
import User from "../models/user.model.js";

export const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    console.info("Serializing User");
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    console.info("Deserializing User");
    try {
      const user = User.findById(id);
      done(null, user);
    } catch (error) {
      console.error("Error in deserializing the user: ", error);
      done(error);
      k;
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = User.findOne({ username });
        if (!user) {
          throw new Error("Invalid Username or Password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid Username or Password");
        }
        return done(null, user);
      } catch (error) {
        console.error("Error in passport.use: ", error);
      }
    })
  );
};
