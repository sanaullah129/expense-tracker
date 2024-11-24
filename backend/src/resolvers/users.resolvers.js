import passport from "passport";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// { req, res } --> destructured from context
const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender) {
          throw new Error("All Fields are required");
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const boysProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlsProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender: gender,
          profilePicture: gender === "male" ? boysProfilePic : girlsProfilePic,
        });

        await newUser.save();
        context.login(newUser);
        return newUser;
      } catch (error) {
        console.error("Sign Up Resolver error", error);
        throw new Error(
          error.message || "Something went wrong while Signing up"
        );
      }
    },

    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        const { user } = await passport.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);
        return user;
      } catch (error) {
        console.error("Login Resolver error", error);
        throw new Error(
          error.message || "Something went wrong while Loging in"
        );
      }
    },

    logout: async (_, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) {
            throw new Error("Failed to destroy the session");
          }
        });
        res.clearCookie("connect.sid");
        return { message: "Logged out Successfully" };
      } catch (error) {
        console.error("Logout Resolver error", error);
        throw new Error(
          error.message || "Something went wrong while Logging out"
        );
      }
    },
  },
  Query: {
    authUser: async (_, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.error("Error in Auth User Query", error);
        throw new Error(
          error.message ||
            "Something went wrong while fetching Authenticated User"
        );
      }
    },
    user: async (_, { userId }) => {
      try {
      } catch (error) {
        console.error("Error in User Query", error);
        throw new Error(error.message || "Something went wrong");
      }
    },
  },
};

export default userResolver;
