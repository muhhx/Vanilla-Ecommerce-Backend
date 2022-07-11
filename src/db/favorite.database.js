"use strict";
exports.__esModule = true;
exports.findFavorite = exports.deleteFavorite = exports.createFavorite = exports.getFavorites = void 0;
var favorite_model_1 = require("../models/favorite.model");
var getFavorites = function (userId) {
    return favorite_model_1["default"].find({ userId: { $eq: userId } }, { _id: 1, productId: 1 });
};
exports.getFavorites = getFavorites;
var createFavorite = function (userId, productId) {
    return favorite_model_1["default"].create({
        userId: userId,
        productId: productId
    });
};
exports.createFavorite = createFavorite;
var deleteFavorite = function (favoriteId) {
    return favorite_model_1["default"].findByIdAndDelete(favoriteId);
};
exports.deleteFavorite = deleteFavorite;
var findFavorite = function (userId, productId) {
    return favorite_model_1["default"].findOne({ userId: userId, productId: productId });
};
exports.findFavorite = findFavorite;
