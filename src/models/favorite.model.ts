import mongoose from "mongoose";
import { IFavorite } from "../interfaces/favorite.interface";

const favoriteSchema = new mongoose.Schema<IFavorite>(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
  },
  {
    collection: "favorites",
    timestamps: true,
  }
);

const FavoriteModel = mongoose.model("FavoriteModel", favoriteSchema);

export default FavoriteModel;
