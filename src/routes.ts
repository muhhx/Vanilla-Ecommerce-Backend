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
  handleCreateFavorite,
  handleDeleteFavorite,
  handleGetFavorites,
} from "./controllers/favorite.controller";
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleUpdateProduct,
  handleGetProduct,
  handleGetProducts,
} from "./controllers/products.controller";
import {
  handleCreateCategory,
  handleDeleteCategory,
  handleGetCategories,
  handleUpdateCategory,
} from "./controllers/category.controller";
import {
  handleUploadImages,
  handleCreateCheckout,
} from "./controllers/services.controller";
import verifyAccessToken from "./middlewares/verifyAccessToken";
import errorHandling from "./middlewares/errorHandling";
import multerMiddleware from "./utils/multer";
import {
  handleDeleteCollection,
  handleCreateCollection,
  handleGetCollections,
  handleUpdateCollection,
} from "./controllers/collection.controller";

const routes = (app: Express) => {
  app.post("/api/session", handleCreateSession);
  app.put("/api/session", handleRefreshSession);
  app.get("/api/session", verifyAccessToken, handleVerifySession);
  app.delete("/api/session/:id", verifyAccessToken, handleDeleteSession);

  app.post("/api/user", handleCreateUser);
  app.delete("/api/user/:id", verifyAccessToken, handleDeleteUser);
  app.get("/api/user/:id", verifyAccessToken, handleGetUser);

  app.post("/api/favorite/:id", verifyAccessToken, handleCreateFavorite);
  app.delete("/api/favorite/:id", verifyAccessToken, handleDeleteFavorite);
  app.get("/api/favorite/:id", verifyAccessToken, handleGetFavorites);

  app.get("/api/product", handleGetProducts);
  app.get("/api/product/:id", handleGetProduct);
  app.post("/api/product", verifyAccessToken, handleCreateProduct);
  app.put("/api/product/:id", verifyAccessToken, handleUpdateProduct);
  app.delete("/api/product/:id", verifyAccessToken, handleDeleteProduct);

  app.post("/api/category", verifyAccessToken, handleCreateCategory);
  app.delete("/api/category/:id", verifyAccessToken, handleDeleteCategory);
  app.put("/api/category/:id", verifyAccessToken, handleUpdateCategory);
  app.get("/api/category", handleGetCategories);

  app.get("/api/collection", handleGetCollections);
  app.post("/api/collection", verifyAccessToken, handleCreateCollection);
  app.put("/api/collection/:id", verifyAccessToken, handleUpdateCollection);
  app.delete("/api/collection/:id", verifyAccessToken, handleDeleteCollection);

  app.post(
    "/api/image",
    verifyAccessToken,
    multerMiddleware,
    handleUploadImages
  );
  app.post("/api/checkout", verifyAccessToken, handleCreateCheckout);

  app.use(errorHandling);
};

export default routes;
