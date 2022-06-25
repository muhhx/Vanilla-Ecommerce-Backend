import dotenv from "dotenv";
dotenv.config();

export default {
  dbUri:
    "mongodb+srv://muhhx:EWxaRiS5I3wGqb8r@cluster0.mheum.mongodb.net/?retryWrites=true&w=majority",
  host: "localhost",
  port: 4000,
  bcryptSalt: 10,
  passwordRejex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  emailRejex: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  googleClientId:
    "1009084815191-54h84au0g4l0dl9kg8m2j5im2cometum.apps.googleusercontent.com",
  googleClientSecret: "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",
  googleOAuthRedirectUrl: "http://localhost:4000/api/session/oauth/google",
  jwtAccessTokenPrivateKey: process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
  jwtRefreshTokenPrivateKey: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
};
