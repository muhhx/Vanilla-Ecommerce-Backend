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
import {
  handleUploadImages,
  handleDeleteImages,
} from "./controllers/images.controller";
import verifyAccessToken from "./middlewares/verifyAccessToken";
import errorHandling from "./middlewares/errorHandling";
import multerMiddleware from "./utils/multer";

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
  //
  app.post("/api/user", handleCreateUser);
  app.delete("/api/user/:id", verifyAccessToken, handleDeleteUser);
  app.get("/api/user/:id", verifyAccessToken, handleGetUser);

  //User_Favorites
  //Get user favorites (id of favorite posts = map through products state)
  //Create user favorite (add to the list)
  //Remove user favorite

  //Image:
  //Add image (add to s3), returns image key and image url
  //Delete image (delete from s3), returns deleted image?
  app.post("/api/image", multerMiddleware, handleUploadImages);
  app.delete("/api/image/:id", handleDeleteImages);

  //Option:
  //Create new option (delete AWS images)
  //Delete option (delete AWS images)
  //Update option
  app.post("/api/option", verifyAccessToken);
  app.delete("/api/option/:id", verifyAccessToken);
  app.put("/api/option/:id", verifyAccessToken);

  //Product:
  //Register new product
  //Delete product
  //Update product
  //Get All products
  //Get specific product (get its options as well)
  app.get("/api/product", handleGetProducts);
  app.get("/api/product/:id", handleGetProduct);
  app.post("/api/product", verifyAccessToken, handleCreateProduct);
  app.put("/api/product", verifyAccessToken, handleUpdateProduct);
  app.delete("/api/product", verifyAccessToken, handleDeleteProduct);
  //Opção: apenas pegar as options deste produto quando carregar a página do produto. De resto, não preciso das opções

  //ADD S3

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

  app.use(errorHandling);
};

export default routes;
