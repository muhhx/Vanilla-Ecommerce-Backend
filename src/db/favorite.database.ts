import FavoriteModel from "../models/favorite.model";

export const getFavorites = (userId: string) => {
  return FavoriteModel.find(
    { userId: { $eq: userId } },
    { _id: 1, productId: 1 }
  );
};

export const createFavorite = (userId: string, productId: string) => {
  return FavoriteModel.create({
    userId,
    productId,
  });
};

export const deleteFavorite = (favoriteId: string) => {
  return FavoriteModel.findByIdAndDelete(favoriteId);
};

export const findFavorite = (userId: string, productId: string) => {
  return FavoriteModel.findOne({ userId, productId });
};
