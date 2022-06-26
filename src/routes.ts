import { Express } from "express";
import {
  handleCreateSession,
  handleDeleteSession,
  handleRefreshSession,
  handleVerifySession,
} from "./controllers/session.controller";
import userController from "./controllers/user.controller";
import verifyAccessToken from "./middlewares/verifyAccessToken";

const routes = (app: Express) => {
  //Session:
  //Login (Criar sessão)
  //Logout (Remover sessão)
  //Verify Session (Verificar sessão)
  //Refresh Token (Renovar sessão)
  //OAuth Login (Verifrica se usuario ta registrado no BD, caso sim, fazer Login, caso n, registrar e dai fazer login)
  app.delete("/api/session/:id", verifyAccessToken, handleDeleteSession);
  app.post("/api/session", handleCreateSession);
  app.post("/api/session/oauth/google");
  app.put("/api/session", handleRefreshSession);
  app.get("/api/session", verifyAccessToken, handleVerifySession);

  //User:
  //Create user (Register)
  //Delete Acc
  //Update user info
  //Get user data (private, only you can access your data)
  app.post("/api/user", userController.handleCreateUser);
  app.delete("/api/user/:id", userController.handleDeleteUser);
  app.put("/api/user/:id", userController.handleUpdateUser); //Evitar fazer essa rota (deletar no futuro), pois ela é muito trivial para a aplicação
  app.get("/api/user/:id", userController.handleGetUser);

  //User_Addresses
  //Get user addresses
  //Create user address
  //Update user address
  //Delete user address

  //User_Payments
  //Get user payments
  //Create user payment
  //Update user payment
  //Delete user payment

  //User_Favorites
  //Get user favorites
  //Create user favorite (add to the list)
  //Remove user favorite

  //Product:
  //Register new product
  //Delete product
  //Update product
  //Get product data

  //Collections
  //Add collection
  //Remove collection
  //Update collection

  //Category
  //Add category
  //Remove category

  //Order
  //Create order (after payment)
  //Cancel order
  //Get order

  //Public APIS:
  //Auth (Login, register)
  //Get specific product
  //Get all products (query)
  //Get collections
  //Get categories
};

export default routes;
