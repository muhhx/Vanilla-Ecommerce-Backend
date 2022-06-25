import dotenv from "dotenv";
dotenv.config();

export default {
  dbUri: process.env.MONGODB_URI,
  host: "localhost",
  port: 4000,
  bcryptSalt: 10,
  passwordRejex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  emailRejex: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleOAuthRedirectUrl: "http://localhost:4000/api/session/oauth/google",
  jwtAccessTokenPrivateKey: process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
  jwtRefreshTokenPrivateKey: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
};
