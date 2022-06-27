import { Express } from "express";
import {
  handleCreateSession,
  handleDeleteSession,
  handleRefreshSession,
  handleVerifySession,
} from "./controllers/session.controller";
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetUser,
} from "./controllers/user.controller";
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleUpdateProduct,
  handleGetProduct,
  handleGetProducts,
} from "./controllers/products.controller";
import verifyAccessToken from "./middlewares/verifyAccessToken";

const routes = (app: Express) => {
  //Session:
  //Login (Criar sessão) V
  //Logout (Remover sessão) V
  //Verify Session (Verificar sessão) V
  //Refresh Token (Renovar sessão) V
  //OAuth Login (Verifrica se usuario ta registrado no BD, caso sim, fazer Login, caso n, registrar e dai fazer login)
  app.post("/api/session/oauth/google");
  app.post("/api/session", handleCreateSession);
  app.put("/api/session", handleRefreshSession);
  app.get("/api/session", verifyAccessToken, handleVerifySession);
  app.delete("/api/session/:id", verifyAccessToken, handleDeleteSession);

  //User:
  //Create user (Register) V
  //Delete Acc
  //Get user data (private, only you can access your data) V
  app.post("/api/user", handleCreateUser);
  app.delete("/api/user/:id", verifyAccessToken, handleDeleteUser);
  app.get("/api/user/:id", verifyAccessToken, handleGetUser);

  //User_Favorites
  //Get user favorites (id of favorite posts = map through products state)
  //Create user favorite (add to the list)
  //Remove user favorite

  //Product:
  //Register new product
  //Delete product
  //Update product
  //Get All products
  //Get specific product
  app.get("/api/product", handleGetProducts);
  app.get("/api/product/:id", handleGetProduct);
  app.post("/api/product", verifyAccessToken, handleCreateProduct);
  app.put("/api/product", verifyAccessToken, handleUpdateProduct);
  app.delete("/api/product", verifyAccessToken, handleDeleteProduct);

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
  //Get order /:id
  //Get all orders (ADMIN)

  //Public APIS:
  //Auth (Login, register)
  //Get specific product
  //Get all products (query)
  //Get collections
  //Get categories
};

export default routes;
