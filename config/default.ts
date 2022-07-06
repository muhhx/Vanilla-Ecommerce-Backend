import dotenv from "dotenv";
dotenv.config();

export default {
  host: "localhost",
  port: 4000,
  baseUrl: process.env.BASE_URL,
  bcryptSalt: 10,
  passwordRejex: process.env.PWD_REGEX,
  emailRejex: process.env.EMAIL_REGEX,
  dbUri: process.env.MONGODB_URI,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleOAuthRedirectUrl: "http://localhost:4000/api/session/oauth/google",
  jwtAccessTokenPrivateKey: process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
  jwtRefreshTokenPrivateKey: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  awsBucketRegion: process.env.AWS_BUCKET_REGION,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeSuccessUrl: "success",
  stripeCancelUrl: "cart",
};
